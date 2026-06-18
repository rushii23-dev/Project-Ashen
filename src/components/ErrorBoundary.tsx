import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  /** The component tree to wrap with error protection. */
  children: ReactNode;
  /** Optional custom fallback UI. Defaults to a minimal recovery screen. */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Global error boundary that prevents the entire application from
 * crashing to a white screen when a React rendering error occurs.
 *
 * Catches errors during rendering, lifecycle methods, and constructors
 * of the entire component tree below it.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // In production, this would forward to a telemetry/logging service.
    // Intentionally silent to avoid leaking error details to the console.
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
          <h1 className="font-serif text-[48px] md:text-[64px] leading-[1.1] text-center mb-4">
            Something broke.
          </h1>
          <p className="font-sans text-[16px] text-[#999999] max-w-[500px] text-center mb-8 font-light">
            An unexpected error occurred. Please reload the page to continue.
          </p>
          <button
            onClick={this.handleReload}
            className="rounded-full border border-white/30 px-8 py-3 text-[14px] font-sans text-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
