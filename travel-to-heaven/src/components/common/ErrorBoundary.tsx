import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React boundary error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
          <div className="w-20 h-20 bg-rose-500/20 text-rose-400 rounded-3xl flex items-center justify-center mb-6 border border-rose-500/30">
            <AlertOctagon className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">Something Went Wrong</h1>
          <p className="text-slate-300 max-w-md mb-8 text-sm leading-relaxed">
            An unexpected client application error occurred in Travel to Heaven.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Reload Application
            </Button>
            <Button
              variant="primary"
              onClick={() => (window.location.href = '/')}
              leftIcon={<Home className="w-4 h-4" />}
            >
              Go to Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
