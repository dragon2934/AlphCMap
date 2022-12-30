import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

const Patents = () => {
    return (
        <main>
            <Header />
            <div className="full-screen patents">
                <Container>
                    <Row className="section-title">
                        <Col>Patents</Col>
                    </Row>

                    <p>
                        Alphabet Communication (AlphC) continues to revolutionize
                        electronic communication every day by inventing world-class
                        technology. The Company invests significant time and
                        resources in research and development. To protect the
                        Company’s R&D efforts, AlphC has vigorously developed a
                        robust intellectual property portfolio all part of a
                        strategy for protecting the innovations that make AlphC an
                        industry leader in electronic communications and connecting
                        people via their addresses. As an example, our IP can be
                        used to connect and{' '}
                        <a href="https://www.newswire.ca/news-releases/alphabet-communication-patent-granted-by-the-uspto-we-have-the-ability-to-map-the-global-population-and-connect-all-humanity-668560533.html">
                            map the global population
                        </a>
                        . AlphC gives a lifeline for governments to reach their
                        citizens via their address linked to their mobile, a
                        technological breakthrough for emergency communication and
                        real-time census.{' '}
                        <a href="https://www.alphc.com/our-promise">Privacy</a> of
                        the state and citizens is fundamental to our core values.
                    </p>

                    <p>
                        Our technology further maps the rural world and its
                        addresses based on their current country address
                        designations (Lot, Plot No, etc.). This breakthrough gives
                        3.5 billion people an address and connects over 1 billion
                        addresses to their state. AlphC IP provides infinite
                        possibilities and new knowledge to the world.
                    </p>

                    <p>
                        as well as other patents that are pending. For additional information, please contact patents@alphc.com.

                        AlphC’s products and services may be covered by U.S. Patent
                        Nos.{' '}
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=9860203.PN.&OS=PN/9860203&RS=PN/9860203">
                            9,860,203
                        </a>
                        ,
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=10,356,028.PN.&OS=PN/10,356,028&RS=PN/10,356,028">
                            10,356,028
                        </a>
                        , and{' '}
                        <a target='_blank' href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=10659414.PN.&OS=PN/10659414&RS=PN/10659414">
                            10,659,414
                        </a> and <a target='_blank' href="https://ppubs.uspto.gov/pubwebapp/static/pages/ppubsbasic.html"> 11,444,904</a> {' '}
                        , European Union (EU) Patent <a target='_blank' href="https://worldwide.espacenet.com/patent/search/family/060411925/publication/EP3466003A1?q=pn%3DEP3466003">EP 3466003</a>,
                        Australian Patent <a target='_blank' href="http://pericles.ipaustralia.gov.au/ols/auspat/applicationDetails.do?applicationNo=2017269953">2017269953</a>,{' '}
                        as well as other patents that are pending. For additional
                        information, please contact{' '}
                        <a href="mailto:patents@alphc.com">patents@alphc.com</a>.
                    </p>
                </Container>
            </div><Footer />
        </main>
    );
};

export default Patents;
