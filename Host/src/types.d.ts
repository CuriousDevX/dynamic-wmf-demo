// Type definitions for Host
declare namespace Host {
    // Dynamic Variables
    interface Env {
        remoteComponents: Host.IRemoteApp[]
    }

    // Host
    interface IProps {
        companyTitle?: string
        enableFooter?: boolean
        hostApps: IApp[]
        appList: IApp[]
    }

    // Host App
    interface IApp {
        designId: string
        path: string
        title: string
        icon: string
    }

    // Host Remote App
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

    // Host TopBar
    interface ITopBar {
        selectedApp?: IApp
    }

    // Host Nav Bar
    interface INavBar {
        companyTitle?: string
        hostApps: (IApp | null)[]
        appList: (IApp | null)[]
    }

    // Host Applications Pad
    interface IApplicationsPad {
        appList: (IApp | null)[]
    }
}
