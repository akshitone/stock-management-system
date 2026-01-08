import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SidebarProvider } from '@/context/SidebarContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="geex-main-content">
        {/* Header with toggle, notifications, user */}
        <Header />

        {/* Page Content */}
        <div className="geex-content">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
