import React from 'react';
import {Button, Col, Row} from 'reactstrap';
// import {useSelector } from 'react-redux';
// import { isAppEmbedWebview } from '../../utils/utils';
const PropertiesTooltip = ({id, email,property, cb,changeColor, editMode,cbBinding}) => {
    // console.log('..property..' + JSON.stringify(property))
    // const utilsData = useSelector((state) => state.utilsData);
    return (
        <>
            <h4>{email}</h4>
          { editMode ?  <Row className="justify-content-end">
                <Col className="list-unstyled text-right">
                    <li>
                    <Button
                    size={'sm'}
                    onClick={() => {
                        cbBinding(email,property);
                    }}>
                    Info
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                       <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>
                                changeColor(email)
                            }>
                            Color
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
            </Row> : null }
        </>
    );
};

export default PropertiesTooltip;
