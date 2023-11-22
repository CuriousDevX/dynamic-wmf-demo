import './TopBar.scss'

export const TopBar = (props: Host.ITopBar) => {
    // Destruct props
    const { selectedApp } = props

    return (
        <div className="dl-topbar">
            <div className="al-container">
                <div className="dl-topbar-inner">
                    <div className="app-breadcrumbs">
                        <span className="ab-icon" aria-hidden="true"></span>
                        <a className={`ab-item is-${selectedApp?.designId}`} href={`${selectedApp?.path}`}>
                            {selectedApp?.title}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
