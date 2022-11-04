import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const RefundPolicy = () => {
    return (
        <div className="full-screen privacy-policy">
            <Container>
                <Row className="section-title">
                    <Col>Alphabet Communication Refund Policy</Col>
                </Row>

                <h2>App Store purchases (in-app purchase)</h2>
                <p>If you’d like a refund for mSecure from the Mac App Store or the iOS App Store/iTunes Store, you must request a refund from Apple. Apple sets their own refund policies.</p>

                <p>Visit https://reportaproblem.apple.com/</p>
                <p>Sign in with your Apple ID.</p>
                <p>Click “Report a Problem” on the relevant app.</p>
 

                <h2>Google Play purchases (in-app purchase)</h2>
<p>We provide refunds for purchases less than 60 days old from the Google Play Store. If you’d like a refund for AlphC E-Alert, contact AlphC Support with a copy your receipt and(or) Google Play Order Number/Transaction Number.</p>


                
<h2>Contact</h2>

<p>If you have any questions or concerns about this Privacy Policy, you can reach us at anything@alphc.com.</p>


                <p>
                    Copyright © 2022 – Alphabet Communications (AlphC), Inc. All
                    rights reserved.
                </p>
            </Container>
        </div>
    );
};

export default RefundPolicy;
