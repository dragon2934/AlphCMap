import { CButton } from '@coreui/react';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

const PropertiesTooltip = ({ id, email, property, cb, changeColor, editMode, cbBinding, cbSendEmail, cbBusiness }) => {
    // console.log('..property..' + JSON.stringify(property))
    // const utilsData = useSelector((state) => state.utilsData);

    return (
        <>
            <h4>{email}</h4>

            <Row className="justify-content-end">
                {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail} <CButton onClick={(e) => cbSendEmail(e, property)} >Send Email</CButton>  </Col> : null}
            </Row>
            <Row className="justify-content-end">
                {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
            </Row>
            {editMode ?
                <>
                    <Row className="justify-content-end">
                        <Col className="list-unstyled text-right">
                            <li>
                                <Button
                                    size={'sm'}
                                    onClick={() => cbBusiness(email, property)}>
                                    Business
                                </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    size={'sm'}
                                    onClick={() => {
                                        cbBinding(email, property);
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
                                {property.primaryAddress ? <Button
                                    color={'primary'}
                                    size={'sm'}
                                    onClick={() =>
                                        cb(email, true)
                                    }>
                                    Change Location
                                </Button> : <Button
                                    color={'primary'}
                                    size={'sm'}
                                    onClick={() =>
                                        cb(email, false)
                                    }>
                                    Remove
                                </Button>
                                }
                            </li>
                        </Col>
                    </Row>

                </>
                : null}
        </>
    );
};

export default PropertiesTooltip;
