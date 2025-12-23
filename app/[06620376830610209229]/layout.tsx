import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/authState';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  if (!isAuthenticated()) {
    redirect('/06620376830610209229/login');
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}