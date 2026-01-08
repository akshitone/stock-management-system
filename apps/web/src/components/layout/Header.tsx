'use client';

import { useSidebar } from '@/context/SidebarContext';

// ============================================================================
// Header Component
// ============================================================================
export function Header() {
  const { toggle, isMobile } = useSidebar();

  return (
    <div className="geex-content__header">
      <div className="geex-content__header__content">
        {/* This will be replaced by page-specific content */}
      </div>

      <div className="geex-content__header__action">
        {/* Sidebar Toggle & Customizer */}
        <div className="geex-content__header__customizer">
          <button 
            className="geex-btn geex-btn__toggle-sidebar"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <i className="uil uil-align-center-alt" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="geex-content__header__action__wrap">
          <ul className="geex-content__header__quickaction">
            {/* Search */}
            <li className="geex-content__header__quickaction__item">
              <button className="geex-content__header__quickaction__link">
                <i className="uil uil-search" style={{ fontSize: '20px', color: 'var(--body-color)' }} />
              </button>
            </li>

            {/* Notifications */}
            <li className="geex-content__header__quickaction__item">
              <button className="geex-content__header__quickaction__link">
                <i className="uil uil-bell" style={{ fontSize: '20px', color: 'var(--body-color)' }} />
                <span 
                  className="geex-content__header__badge"
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'var(--danger-color)',
                    color: 'white',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '10px',
                  }}
                >
                  3
                </span>
              </button>
            </li>

            {/* User Avatar */}
            <li className="geex-content__header__quickaction__item">
              <button className="geex-content__header__quickaction__link">
                <img 
                  className="user-img" 
                  src="/img/avatar/user.svg" 
                  alt="User" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    border: '2px solid var(--primary-color)',
                  }}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Page Header Component (for page-specific titles)
// ============================================================================
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // For action buttons
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="geex-content__header" style={{ marginBottom: '30px' }}>
      <div className="geex-content__header__content">
        <h2 className="geex-content__header__title">{title}</h2>
        {subtitle && (
          <p className="geex-content__header__subtitle">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="geex-content__header__action">
          {children}
        </div>
      )}
    </div>
  );
}

export default Header;
