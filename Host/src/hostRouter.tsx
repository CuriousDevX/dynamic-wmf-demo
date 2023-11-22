// Router
import { Navigate, RouteObject } from 'react-router-dom'

// Templates
import { HostLayout } from './ui/templates/hostLayout/HostLayout'

// Pages
import HostApplications from './ui/pages/hostApplications/HostApplications'

// Remote components
import { dynamicRemoteComponents, remoteAppList } from './remoteComponents'

// Local components config
const hostApps: Host.IApp[] = [{ designId: 'applications-pad', path: '/applications-pad', title: 'Applications pad', icon: 'applications-pad-icon' }]

// ### Route configuration
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <HostLayout hostApps={hostApps} appList={remoteAppList} />,
        children: [
            {
                index: true,
                path: '/',
                element: <Navigate to={`/applications-pad`} replace />
            },
            {
                path: `/applications-pad/*`,
                element: <HostApplications appList={remoteAppList} />
            },
            ...dynamicRemoteComponents
        ]
    }
]
