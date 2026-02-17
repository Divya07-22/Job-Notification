import TopBar from '../components/TopBar';
import ContextHeader from '../components/ContextHeader';
import PrimaryWorkspace from '../components/PrimaryWorkspace';
import SecondaryPanel from '../components/SecondaryPanel';
import ProofFooter from '../components/ProofFooter';

export default function DesignSystem() {
    return (
        <div className="page-container">
            <TopBar />
            <ContextHeader />
            <div className="main-workspace">
                <PrimaryWorkspace />
                <SecondaryPanel />
            </div>
            <ProofFooter />
        </div>
    );
}
