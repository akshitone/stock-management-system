'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'create' | 'update' | 'delete';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toasts: Toast[];
}

// ============================================================================
// Context
// ============================================================================
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ============================================================================
// Provider
// ============================================================================
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 7 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      
      {/* Toast Container - Top Right */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ============================================================================
// Toast Item Component
// ============================================================================
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const styles = getToastStyles(toast.type);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: styles.bg,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        pointerEvents: 'auto',
        animation: 'slideIn 0.3s ease',
        minWidth: '280px',
        maxWidth: '400px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: styles.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <i className={styles.icon} style={{ color: styles.iconColor, fontSize: '14px' }} />
      </div>
      <span style={{ flex: 1, color: styles.text, fontSize: '14px', fontWeight: 500 }}>
        {toast.message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: styles.text,
          cursor: 'pointer',
          opacity: 0.6,
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <i className="uil uil-times" style={{ fontSize: '16px' }} />
      </button>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// Toast Styles by Type - Different colors for each action
// ============================================================================
function getToastStyles(type: ToastType) {
  switch (type) {
    case 'create':
      // Blue for Create
      return {
        bg: '#EFF6FF',
        text: '#1E40AF',
        icon: 'uil uil-plus-circle',
        iconBg: '#DBEAFE',
        iconColor: '#2563EB',
      };
    case 'update':
      // Purple for Update
      return {
        bg: '#F5F3FF',
        text: '#5B21B6',
        icon: 'uil uil-edit',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
      };
    case 'delete':
      // Orange for Delete
      return {
        bg: '#FFF7ED',
        text: '#C2410C',
        icon: 'uil uil-trash-alt',
        iconBg: '#FFEDD5',
        iconColor: '#EA580C',
      };
    case 'success':
      // Green for general success
      return {
        bg: '#ECFDF5',
        text: '#065F46',
        icon: 'uil uil-check-circle',
        iconBg: '#D1FAE5',
        iconColor: '#059669',
      };
    case 'error':
      // Red for errors
      return {
        bg: '#FEF2F2',
        text: '#991B1B',
        icon: 'uil uil-exclamation-triangle',
        iconBg: '#FEE2E2',
        iconColor: '#DC2626',
      };
    case 'warning':
      // Yellow for warnings
      return {
        bg: '#FFFBEB',
        text: '#92400E',
        icon: 'uil uil-exclamation-circle',
        iconBg: '#FEF3C7',
        iconColor: '#D97706',
      };
    case 'info':
    default:
      // Cyan for info
      return {
        bg: '#ECFEFF',
        text: '#155E75',
        icon: 'uil uil-info-circle',
        iconBg: '#CFFAFE',
        iconColor: '#0891B2',
      };
  }
}
