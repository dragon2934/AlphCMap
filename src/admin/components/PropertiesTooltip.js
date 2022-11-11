import React from 'react';
import {Button, Col, Row} from 'reactstrap';
// import { isAppEmbedWebview } from '../../utils/utils';
const PropertiesTooltip = ({id, email,property, cb,changeColor}) => {
    console.log('..property..' + JSON.stringify(property))
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
                                changeColor(email)
                            }>
                            Change Icon
                        </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                       { property.primaryAddress ?  <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>
                                cb(email,true)
                            }>
                            Change Location
                        </Button>: <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>
                                cb(email,false)
                            }>
                            Remove
                        </Button>
                       } 
                    </li>
                </Col>
            </Row>
        </>
    );
};

export default PropertiesTooltip;
