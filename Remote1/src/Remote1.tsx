import { useContext, useEffect } from 'react'

// Router
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

// Pages
import Page1 from './ui/pages/page1/Page1'
import Page2 from './ui/pages/page2/Page2'
import Page3 from './ui/pages/page3/Page3'

// App State
import { AppStateContext } from './state/appState'

// Utility function for dynamic module loading from Webpack
import { importRemote } from '@module-federation/utilities'

function Remote1() {
    // Load remote component config
    const remoteAppList: IRemoteApp[] = window._env_.hostComponents || []
    const remoteApp = remoteAppList.find((app: IRemoteApp) => app.id === 'host')

    useEffect(() => {
        if (remoteApp) {
            // Dynamically import the preventCSSCollision function
            importRemote({
                url: `${remoteApp.url}:${remoteApp.externalPort}`,
                scope: 'host',
                module: 'preventCSSCollision'
            })
                .then((module: PreventCSSCollisionModule) => {
                    // Call the function after it is successfully imported
                    module.preventCSSCollision('Remote1')
                })
                .catch((error) => {
                    console.error('Failed to load preventCSSCollision function:', error)
                })
        }
    }, [])

    // Note: We overwrite each URL because project paths are changes depending on remote or standalone build.
    // Also we have to save the base URL to app state to update navigation links dynamically.
    const { pathname } = useLocation()
    const appState = useContext(AppStateContext)
    appState.baseURL = pathname.startsWith('/remote1') ? '/remote1' : ''

    return (
        <Routes>
            <Route index element={<Navigate to="page1" replace />} />

            <Route path="/page1/*" element={<Page1 />} />
            <Route path="/remote1/page1" element={<Navigate to="/page1" replace />} />

            <Route path="/page2" element={<Page2 />} />
            <Route path="/remote1/page2" element={<Navigate to="/page2" replace />} />

            <Route path="/page3" element={<Page3 />} />
            <Route path="/remote1/page3" element={<Navigate to="/page3" replace />} />
        </Routes>
    )
}

export default Remote1
