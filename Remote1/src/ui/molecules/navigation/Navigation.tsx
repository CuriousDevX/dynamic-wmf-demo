import { useContext } from 'react'

// Router
import { NavLink } from 'react-router-dom'

// App State
import { AppStateContext } from '../../../state/appState'

const Navigation = () => {
    // Get app state
    const appContent = useContext(AppStateContext)

    return (
        <ul className="tab-list" role="tablist">
            <li className="tab-item">
                <NavLink role="tab" className="tab" to={`${appContent.baseURL}/page1`}>
                    Page 1
                </NavLink>
            </li>
            <li className="tab-item">
                <NavLink role="tab" className="tab" to={`${appContent.baseURL}/page2`}>
                    Page 2
                </NavLink>
            </li>
            <li className="tab-item">
                <NavLink role="tab" className="tab" to={`${appContent.baseURL}/page3`}>
                    Page 3
                </NavLink>
            </li>
        </ul>
    )
}

export default Navigation
