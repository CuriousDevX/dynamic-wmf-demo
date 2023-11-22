import { FC } from 'react'

// Render area
import { matchPath, Outlet, useLocation } from 'react-router-dom'

// Atoms
import ErrorBoundary from '../../atoms/errorBoundary/ErrorBoundary'

// Molecules
import { NavBar } from '../../molecules/navBar/NavBar'
import { TopBar } from '../../molecules/topBar/TopBar'

// Host
export const HostLayout: FC<Host.IProps> = (props) => {
    // Destruct props
    const { hostApps, appList } = props

    // Get current path, merge all app list and get current app details
    const { pathname } = useLocation()
    const allApps = [...hostApps, ...appList]
    const selectedApp = allApps.find((app) => matchPath(`${app?.path}/*`, pathname))

    return (
        <div className={`host-layout is-${selectedApp?.designId}`}>
            <NavBar hostApps={hostApps} appList={appList} />

            <main className="dl-body">
                <TopBar selectedApp={selectedApp} />

                <div className="dl-lowerbody">
                    <ErrorBoundary>
                       <Outlet />
                    </ErrorBoundary> 
                </div>
            </main>
        </div>
    )
}

// Expose Host App
export const HostApp: FC<Host.IApp> = () => null
