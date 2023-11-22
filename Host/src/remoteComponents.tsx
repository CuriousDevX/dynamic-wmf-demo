import { lazy, Suspense, useEffect, useState } from 'react'

// Utility function for dynamic module loading from Webpack
import { importRemote } from '@module-federation/utilities'

// Atoms
import Loading from './ui/atoms/loading/Loading'
import { useLocation } from 'react-router-dom'

// Extending the Window interface to recognize our custom _env_ property.
// This property is filled at runtime with environment-specific variables.
declare global {
    interface Window {
        _env_: Host.Env
    }
}

// Loading the list of remote components from the runtime environment variables.
// If no remote components are defined, it defaults to an empty array.
// The list is fetched from a dynamically generated JavaScript file (remote-config.js)
// located in the public directory. This file is created at build time by build-config.js.
// We should exclude the host because it's for remote components.
const allRemoteApps = window._env_.remoteComponents || []
export const remoteAppList: Host.IRemoteApp[] = allRemoteApps.filter(app => (app.id !== 'host' && app.id !== 'auth-gateway'))

// Mapping over the list of remote components to create an array of React components for router.
export const dynamicRemoteComponents = remoteAppList.map((remoteApp) => {
    // If the remoteApp hidden
    if (remoteApp.hide) return

    // Use React.lazy to create a dynamic import for the remote component.
    // The importRemote utility function loads the component from the remote server.
    const Component = lazy(() =>
        importRemote({
            url: `${remoteApp.url}:${remoteApp.externalPort}`,
            scope: remoteApp.scope,
            module: remoteApp.module
        })
    )

    // Return an object for each remote component.
    // This object includes the route where the component should be rendered
    return {
        path: remoteApp.route,
        get element() {
            return (
                <ForceRemount>
                    <Suspense fallback={<Loading />}>
                        <Component key={Date.now()} />
                    </Suspense>
                </ForceRemount>
            )
        }
    }
})

function ForceRemount({ children }) {
    const [key, setKey] = useState(Date.now())
    const location = useLocation()

    useEffect(() => {
        // When the location changes, update the key to force remount
        setKey(Date.now())
    }, [location])

    return <div key={key}>{children}</div>
}
