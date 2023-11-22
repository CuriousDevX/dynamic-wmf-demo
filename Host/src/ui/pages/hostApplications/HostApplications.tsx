import { HostLink } from '../../atoms/hostLink/HostLink'

const HostApplications = (props: Host.IApplicationsPad) => {
    const { appList } = props

    return (
        <div className="dl-container text-inverse">
            <div className="applications-pad">
                <h1 className="ap-heading">My apps</h1>
                <div className="ap-section">
                    <ul className="ap-cards">
                        {appList.map((app) => {
                            return (
                                <li key={app?.designId}>
                                    <div className={`dropdown application-card is-${app?.designId}`}>
                                        <div className="ac-header">
                                            <HostLink className="ac-icon-body" to={`${app?.path}`}>
                                                <br />
                                                Click to go application.
                                            </HostLink>
                                            <button className="ac-more">
                                                <span className="sr-only">View more app options</span>
                                            </button>
                                            <span className="ac-title">{app?.title}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HostApplications
