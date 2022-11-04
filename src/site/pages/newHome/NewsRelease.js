import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const NewsRelease = () => {
    return (
        <div className="full-screen news-release">
            <Container>
                <Row className="section-title">
                    <Col>News Release</Col>
                </Row>
                August 8, 2017
                <p>
                    <a
                        className="text-muted"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://www.newswire.ca/news-releases/alphabet-communication-aims-to-connect-every-address-and-make-the-world-safer-639131043.html">
                        https://www.newswire.ca/news-releases/alphabet-communication-aims-to-connect-every-address-and-make-the-world-safer-639131043.html
                    </a>
                </p>
                January 10, 2018
                <p>
                    <a
                        className="text-muted"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html">
                        https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html
                    </a>
                </p>
            </Container>
        </div>
    );
};

export default NewsRelease;
