// Auth Gateway
import { AuthProviderHost } from './authGateway/AuthGateway'
import authGatewayConfig from './authGateway/authGatewayConfig'

// host routes
import { routes } from './hostRouter'

// Router
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

const authGateway = authGatewayConfig[process.env.NODE_ENV] || authGatewayConfig.development

function App() {
    
    if (authGateway.isAuthGatewayEnable) {
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
