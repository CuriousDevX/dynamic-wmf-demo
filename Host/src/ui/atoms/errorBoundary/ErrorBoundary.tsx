import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
    errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: undefined,
        errorInfo: undefined
    }

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error and update state with error info
        console.error('Uncaught error:', error, errorInfo)
        this.setState({ error, errorInfo })
    }

    public render() {
        if (this.state.hasError) {
            // Customized error display
            return (
                <div style={{ padding: '20px' }}>
                    <h2>There was a problem loading the remote component.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                    </details>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
