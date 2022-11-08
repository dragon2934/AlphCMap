import React from 'react';
import {Button, Col, Row} from 'reactstrap';
// import { isAppEmbedWebview } from '../../utils/utils';
const PropertiesTooltip = ({id, email, cb}) => {
    return (
        <>
            <h4>{email}</h4>
            <Row className="justify-content-end">
                <Col className="list-unstyled text-right">
                    <li>
                        <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>
                                cb(email)
                            }>
                            Remove
                        </Button>
                    </li>
                </Col>
            </Row>
        </>
    );
};

export default PropertiesTooltip;
