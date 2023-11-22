// Molecules
import Navigation from '../../molecules/navigation/Navigation'

const Header = () => {
    return (
        <div className="pt-48 pb-12" style={{ background: '#000' }}>
            <div className="container size-fluid">
                <h1 className="al-title">Remote 1</h1>
            </div>

            <div className="inverse-tabs">
                <div className="al-container">
                    <div className="tabs-inner">
                        <Navigation />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
