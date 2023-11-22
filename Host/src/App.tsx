// Auth Gateway
import { AuthProviderHost } from './authGateway/AuthGateway'
import remoteConfig from './remoteConfig'

// host routes
import { routes } from './hostRouter'

// Router
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

const environmentConfig = remoteConfig[process.env.NODE_ENV] || remoteConfig.development

function App() {
    
    if (environmentConfig.isAuthGatewayEnable) {
        return (
            <BrowserRouter>
                <AuthProviderHost children={routes} />
            </BrowserRouter>
        )
    } else {
        // Create router with configuration
        const browserRouter = createBrowserRouter(routes)

        return <RouterProvider router={browserRouter} />
    }
}

export default App
