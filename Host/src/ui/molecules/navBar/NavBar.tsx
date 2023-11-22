// Router
import { Link, matchPath, useLocation } from 'react-router-dom'

// Atoms
import { HostLink } from '../../atoms/hostLink/HostLink'

export const NavBar = (props: Host.INavBar) => {
    const { hostApps, appList } = props

    const { pathname } = useLocation()

    return (
        <div className="dl-navbar">
            <nav className="dl-navbar-primary">
                <ul className="dl-tree">
                    {hostApps.map((app: Host.IApp | null) => {
                        const isActive = matchPath(`${app?.path}/*`, pathname)

                        return (
                            <li key={app?.designId} className={`dl-tree-item ${app?.icon} ${isActive && 'active'}`}>
                                <Link className="dl-nb-item" to={`${app?.path}`}>
                                    <span className="dl-nb-appicon" aria-hidden="true"></span>
                                    <span className="dl-nb-text" aria-hidden="true">
                                        {app?.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}

                    <Separator />

                    {appList.map((app: Host.IApp | null) => {
                        const isActive = matchPath(`${app?.path}/*`, pathname)

                        return (
                            <li key={app?.designId} className={`dl-tree-item ${app?.icon} ${isActive && 'active'}`}>
                                <HostLink className="dl-nb-item" to={`${app?.path}`}>
                                    <span className="dl-nb-appicon" aria-hidden="true"></span>
                                    <span className="dl-nb-text" aria-hidden="true">
                                        {app?.title}
                                    </span>
                                </HostLink>
                            </li>
                        )
                    })}
                    
                    <Separator />

                    <Link to="/logout" className="card-link">Logout</Link>
                </ul>
            </nav>
        </div>
    )
}

// Separator
const Separator = () => <li aria-hidden="true" className="dl-nb-separator"></li>
