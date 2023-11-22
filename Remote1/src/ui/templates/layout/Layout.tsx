import { ComponentType } from 'react'

// Organisms
import Header from '../../organisms/header/Header'

const Layout = (PageComponent: ComponentType) => {
    const PageWrapper = () => {
        return (
            <div className="app-layout">
                <div className="al-page">
                    <Header />

                    <PageComponent />
                </div>
            </div>
        )
    }

    return PageWrapper
}

export default Layout
