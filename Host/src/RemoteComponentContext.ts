import { createContext } from 'react'

type RemoteComponentContextType = {
    activeComponent: any
    setActiveComponent: (component: any) => void
}

export const RemoteComponentContext = createContext<RemoteComponentContextType | undefined>(undefined)
