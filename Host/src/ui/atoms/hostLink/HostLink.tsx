import { Link } from 'react-router-dom'

declare global {
    interface Window {
        observers?: MutationObserver | {}
        observingStates?: boolean | {}
    }
}

const disconnectAllObservers = () => {
    for (let remoteName in window.observers) {
        if (window.observers.hasOwnProperty(remoteName)) {
            window.observers[remoteName].disconnect()
            window.observingStates[remoteName] = false
            window.observers = {}
            window.observingStates = {}
        }
    }
}

export const HostLink = ({ to, children, ...rest }) => {
    const handleClick = (e) => {
        disconnectAllObservers()
        if (rest.onClick) {
            rest.onClick(e)
        }
    }

    return (
        <Link to={to} onClick={handleClick} {...rest}>
            {children}
        </Link>
    )
}
