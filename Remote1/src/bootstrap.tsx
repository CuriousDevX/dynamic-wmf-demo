import { lazy, StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

// Utility function for dynamic module loading from Webpack
import { importRemote } from '@module-federation/utilities'

import Remote1 from './Remote1'

declare global {
    interface Window {
        _env_: Env
    }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const WMFWrapper = () => {
    const remoteAppList: IRemoteApp[] = window._env_.hostComponents || []
    const remoteApp = remoteAppList.find((app: IRemoteApp) => app.id === 'host')

    // Use React.lazy to create a dynamic import for the remote component.
    // The importRemote utility function loads the component from the remote server.
    const AuthProvider = lazy(() =>
        importRemote({
            url: `${remoteApp.url}:${remoteApp.externalPort}`,
            scope: 'host',
            module: 'AuthProvider'
        })
    )

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
                <Remote1 />
            </AuthProvider>
        </Suspense>
    )
}

root.render(
    <StrictMode>
        <WMFWrapper />
    </StrictMode>
)
