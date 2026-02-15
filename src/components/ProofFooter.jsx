import { useState } from 'react';

export default function ProofFooter() {
    const [checklist, setChecklist] = useState({
        uiBuilt: true,
        logicWorking: true,
        testPassed: false,
        deployed: false
    });

    const toggleCheckbox = (key) => {
        setChecklist(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <footer className="proof-footer">
            <h3 className="proof-footer__title">Proof of Completion</h3>
            <div className="proof-checklist">

                <div className="proof-checklist__item">
                    <span
                        className={`proof-checklist__checkbox ${checklist.uiBuilt ? 'proof-checklist__checkbox--checked' : ''}`}
                        onClick={() => toggleCheckbox('uiBuilt')}
                    />
                    <span>UI Built</span>
                </div>

                <div className="proof-checklist__item">
                    <span
                        className={`proof-checklist__checkbox ${checklist.logicWorking ? 'proof-checklist__checkbox--checked' : ''}`}
                        onClick={() => toggleCheckbox('logicWorking')}
                    />
                    <span>Logic Working</span>
                </div>

                <div className="proof-checklist__item">
                    <span
                        className={`proof-checklist__checkbox ${checklist.testPassed ? 'proof-checklist__checkbox--checked' : ''}`}
                        onClick={() => toggleCheckbox('testPassed')}
                    />
                    <span>Test Passed</span>
                </div>

                <div className="proof-checklist__item">
                    <span
                        className={`proof-checklist__checkbox ${checklist.deployed ? 'proof-checklist__checkbox--checked' : ''}`}
                        onClick={() => toggleCheckbox('deployed')}
                    />
                    <span>Deployed</span>
                </div>

            </div>
        </footer>
    );
}
