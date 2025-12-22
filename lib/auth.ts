import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

// JWT Secret for session tokens
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || 'dev_secret_key_change_in_production_minimum_32_chars'
);

export interface AdminPayload {
  username: string;
  role: 'admin';
  iat: number;
  exp: number;
}

/**
 * Authenticate admin with username and password using bcrypt hash
 * Returns JWT token if credentials are correct
 */
export async function authenticateAdmin(username: string, password: string): Promise<string | null> {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    // TEMP DEBUG LOGGING
    console.log("AUTH DEBUG:", {
      usernameProvided: username,
      adminUsernameSet: !!adminUsername,
      adminPasswordHashSet: !!adminPasswordHash,
      usernameMatch: username === adminUsername
    });

    if (!adminUsername || !adminPasswordHash) {
      console.error('[SECURITY] Admin credentials not configured in environment');
      return null;
    }

    if (username !== adminUsername) {
      console.warn('[SECURITY] Failed login attempt (username mismatch)');
      return null;
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);
    
    // TEMP DEBUG LOGGING
    console.log("PASSWORD COMPARE RESULT:", isValid);

    if (!isValid) {
      console.warn('[SECURITY] Failed login attempt (password mismatch)');
      return null;
    }

    const token = await createAdminToken(username);
    return token;
  } catch (error) {
    console.error('[SECURITY] Error during authentication:', error);
    return null;
  }
}

/**
 * Create JWT token for authenticated admin
 */
export async function createAdminToken(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode JWT token
 */
export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as AdminPayload;
  } catch (error) {
    return null;
  }
}

