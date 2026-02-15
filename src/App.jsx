import './styles.css'
import TopBar from './components/TopBar'
import ContextHeader from './components/ContextHeader'
import PrimaryWorkspace from './components/PrimaryWorkspace'
import SecondaryPanel from './components/SecondaryPanel'
import ProofFooter from './components/ProofFooter'

function App() {
    return (
        <div className="page-container">
            <TopBar />
            <ContextHeader />
            <main className="main-workspace">
                <PrimaryWorkspace />
                <SecondaryPanel />
            </main>
            <ProofFooter />
        </div>
    )
}

export default App
