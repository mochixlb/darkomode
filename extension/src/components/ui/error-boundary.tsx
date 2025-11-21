import React from "react";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Keep logging minimal and safe; avoid exposing sensitive details
    // Integrate with monitoring (Sentry, etc.) here if desired.
    console.error("[Darko Mode Popup] Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    // Simple recovery path for popup UIs
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-80 h-[600px] flex flex-col items-center justify-center bg-background text-foreground px-5">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            The popup encountered an unexpected error.
          </p>
          <button
            onClick={this.handleReload}
            className="h-10 px-4 rounded-md bg-secondary text-foreground hover:bg-secondary/70 active:bg-secondary/60 transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}


