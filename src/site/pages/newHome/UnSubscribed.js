import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
const UnSubscribed = () => {
    return (
        <main>
            <Header />
            <div className="content terms-of-use">
                <Container>

                    <p> You're unsubscribed.

                    </p>

                </Container>
            </div>
            <Footer />
        </main>
    );
};

export default UnSubscribed;
