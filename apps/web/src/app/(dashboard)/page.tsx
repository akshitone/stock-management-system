import { PageHeader } from '@/components/layout/Header';

export default function DashboardPage() {
  return (
    <>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome to Stock Management System"
      />

      {/* Dashboard Content */}
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {/* Quick Stats Cards */}
        <DashboardCard
          title="Total Quality Types"
          value="12"
          icon="uil-layer-group"
          color="var(--primary-color)"
        />
        <DashboardCard
          title="Active Factories"
          value="5"
          icon="uil-building"
          color="var(--success-color)"
        />
        <DashboardCard
          title="Workers"
          value="48"
          icon="uil-users-alt"
          color="var(--info-color)"
        />
        <DashboardCard
          title="Pending Orders"
          value="8"
          icon="uil-clipboard-notes"
          color="var(--warning-color)"
        />
      </div>

      {/* Recent Activity Section */}
      <div style={{ marginTop: '30px' }}>
        <div 
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '24px',
          }}
        >
          <h3 style={{ marginBottom: '20px', color: 'var(--body-color)' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <QuickActionButton href="/masters/quality/new" icon="uil-plus" label="New Quality" />
            <QuickActionButton href="/production/grey-production" icon="uil-file-plus" label="Add Production" />
            <QuickActionButton href="/trading/sales-invoice" icon="uil-invoice" label="Create Invoice" />
            <QuickActionButton href="/finance/payment" icon="uil-money-withdraw" label="Record Payment" />
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Dashboard Card Component
// ============================================================================
interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

function DashboardCard({ title, value, icon, color }: DashboardCardProps) {
  return (
    <div
      style={{
        background: 'var(--white-color)',
        borderRadius: '18px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '14px',
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <i className={icon} style={{ fontSize: '28px', color }} />
      </div>
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--body-color)', marginBottom: '4px' }}>
          {value}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--sec-color)', margin: 0 }}>
          {title}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Quick Action Button Component
// ============================================================================
interface QuickActionButtonProps {
  href: string;
  icon: string;
  label: string;
}

function QuickActionButton({ href, icon, label }: QuickActionButtonProps) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: 'var(--primary-color)',
        color: 'white',
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.3s ease',
      }}
    >
      <i className={icon} />
      {label}
    </a>
  );
}
