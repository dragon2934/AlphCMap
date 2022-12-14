import React from "react";
import {Button, Col, Row} from 'reactstrap';
import { isAppEmbedWebview } from '../../utils/utils';
const PublicPropertiesTooltip = ({id, email, history}) => {
    return (
        <>
            <h4>{email}</h4>
           { !isAppEmbedWebview() ? <Row className="justify-content-end">
                <Col className="list-unstyled text-right">
                    <li>
                        <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>
                                history.push(`/public/properties/${id}`)
                            }>
                            View Property
                        </Button>
                    </li>
                </Col>
            </Row>: null }
        </>
    );
};

export default PublicPropertiesTooltip;
