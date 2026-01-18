import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-950 text-white p-4">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <p className="text-zinc-400 mb-6 max-w-md text-center">
                        The application encountered an error. Please try refreshing the page.
                    </p>
                    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 max-w-2xl w-full overflow-auto">
                        <code className="text-red-400 font-mono text-sm">
                            {this.state.error?.message}
                        </code>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 bg-white text-black rounded hover:bg-zinc-200 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
