// Extending the Window interface to recognize our custom _env_ property.
// This property is filled at runtime with environment-specific variables.
declare global {
    interface Window {
        _env_: Env
    }
}

// Dynamic Variables
interface Env {
    hostComponents: IRemoteApp[]
}

// Dock Remote App
interface IRemoteApp {
    id: string
    path: string
    route: string
    title: string
    designId: string
    icon: string
    url: string
    externalPort: number
    internalPort: number
    scope: string
    module: string
    hide: boolean
    deploy: boolean
}

// Define the type of the imported module
type PreventCSSCollisionModule = {
    preventCSSCollision: (arg: string) => void
}