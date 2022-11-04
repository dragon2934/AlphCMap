import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import StepWizard from 'react-step-wizard';
import {Col} from 'reactstrap';
import AddressDetailsStep from './AddressDetailsStep';
import AddressInfoStep from './AddressInfoStep';
import SuccessStep from './SuccessStep';
import UserInfoStep from './UserInfoStep';

const PropertyForm = () => {
    const [transitions] = useState({
        enterRight: 'animated enterRight',
        enterLeft: 'animated enterLeft',
        exitRight: 'animated exitRight',
        exitLeft: 'animated exitLeft',
        intro: 'animated intro',
    });
    const [wizardInstance, setWizardInstance] = useState();

    return (
        <Col md={3} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <StepWizard
                className={'step-wizard'}
                transitions={transitions}
                isLazyMount={true}
                instance={(instance) => setWizardInstance(instance)}>
                <AddressDetailsStep wizardInstance={wizardInstance} />
                <AddressInfoStep wizardInstance={wizardInstance} />
                <UserInfoStep wizardInstance={wizardInstance} />
                <SuccessStep wizardInstance={wizardInstance} />
            </StepWizard>
        </Col>
    );
};

export default PropertyForm;
