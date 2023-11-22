import React, { useState, useEffect } from 'react'
import './AuthGateway.scss'
import Cookies from 'js-cookie'
import { BrowserRouter, Routes, useLocation, Navigate, Route, Link, useNavigate, Outlet, RouteObject } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import remoteConfig from '../remoteConfig'

const environmentConfig = remoteConfig[process.env.NODE_ENV] || remoteConfig.development

// #region Auth Provider for Webpack Module Federation #######################

interface AuthProviderProps {
    /**
     * Root component of the application
     */
    children: JSX.Element
    /**
     * Default is localhost, but for production domain is required.
     * By prefixing the domain value with a dot (i.e., .abc.com), the cookie should be available
     * for the main domain and all its subdomains (like sub.abc.com, another-sub.abc.com, etc.).
     */
    domain?: string | undefined
    /**
     * If disabled, site will be work without Auth provider.
     */
    disabled?: boolean
}

export const AuthProvider = ({ children, disabled = false }: AuthProviderProps) => {
    if (disabled) return children

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<RequireAuthForProvider>{children}</RequireAuthForProvider>} />
                <Route path="/login" element={<Login domain={environmentConfig.cookieDomain} />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AuthProvider

export const RequireAuthForProvider = ({ children }: { children: JSX.Element }) => {
    let location = useLocation()

    // Get cookie
    let cookie = Cookies.get(environmentConfig.cookieName)

    if (!cookie) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
// #endregion

// #region Auth Gateway for Host use only #######################

interface AuthProviderHostProps {
    /**
     * Root component of the application
     */
    children: RouteObject[]
}

export const AuthProviderHost = ({ children }: AuthProviderHostProps): React.ReactElement | null => {
    return (
        <Routes>
            <Route path="/" element={<RequireAuth />}>
                {renderRoutes(children)}
            </Route>
            <Route path="/login" element={<Login domain={environmentConfig.cookieDomain} />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    )
}

export const RequireAuth = () => {
    let location = useLocation()

    // Get cookie
    let cookie = Cookies.get(environmentConfig.cookieName)

    // No cookie, no access :(
    if (!cookie) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet key={Date.now()} />
}

export const renderRoutes = (routeList: RouteObject[]) => {
    return routeList.map((route, idx) => (
        <Route key={idx + Date.now()} path={route.path} element={route.element}>
            {route.children && renderRoutes(route.children)}
        </Route>
    ))
}
// #endregion

// #region Login #######################

type LoginInputs = {
    Username: string
    Password: string
}

type LoginProps = {
    domain?: string
}

export const Login = ({ domain }: LoginProps) => {
    // Error state
    const [responseError, setResponseError] = useState<string>('')

    // Init form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<LoginInputs>()

    const navigate = useNavigate()

    // If cookie exist redirect user to root
    useEffect(() => {
        // Get cookie
        let cookie = Cookies.get(environmentConfig.cookieName)

        if (cookie) {
            navigate('/')
        }
    }, [])

    // Handle submit
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        // Reset error
        setResponseError('')

        // Parse as text (for the token)
        const token = 'dummyToken'

        // Set cookie
        Cookies.set(environmentConfig.cookieName, token, { domain, path: '/', sameSite: 'strict' })

        // Redirect user to home
        navigate('/')
    }

    return (
        <div className="AuthGateway Login">
            <form className="AuthGateway_Form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="AuthGateway_Header">Login</h2>
                <div className="AuthGateway_ButtonGroup">
                    <button className="AuthGateway_Button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

// #endregion

// #region Logout #######################

export const Logout = () => {
    const navigate = useNavigate()

    // Delete cookie
    Cookies.remove(environmentConfig.cookieName)

    // Redirect user to login
    setTimeout(() => navigate('/login'), 3000)

    return (
        <div className="AuthGateway Logout">
            <h2 className="AuthGateway_Header">Logging out...</h2>
        </div>
    )
}

// #endregion
