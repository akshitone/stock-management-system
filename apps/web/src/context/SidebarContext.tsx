'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

// ============================================================================
// Types
// ============================================================================
interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
}

type SidebarAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'SET_MOBILE'; payload: boolean };

interface SidebarContextValue extends SidebarState {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// ============================================================================
// Initial State & Reducer
// ============================================================================
const initialState: SidebarState = {
  isOpen: true,
  isMobile: false,
};

function sidebarReducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_MOBILE':
      return { 
        ...state, 
        isMobile: action.payload,
        isOpen: action.payload ? false : true, // Close on mobile by default
      };
    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1200;
      dispatch({ type: 'SET_MOBILE', payload: isMobile });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const open = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), []);
  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), []);

  const value: SidebarContextValue = {
    ...state,
    open,
    close,
    toggle,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
