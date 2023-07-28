import { CButton } from '@coreui/react';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginType } from '../../utils/utils';

const PropertiesTooltip = ({ id, email, property, cb, changeColor, editMode, cbBinding, cbSendEmail, cbBusiness, user, cbBusinessInfo }) => {
    console.log('....render property..' + JSON.stringify(property))
    // const utilsData = useSelector((state) => state.utilsData);

    const loginType = getLoginType();
    // console.log('..me..' + JSON.stringify(user));
    if (property.color === 'grey') {
        return <>
            <h4>{email}</h4>
            <Row className="justify-content-end">
                <Col className='bindingInfo'> Pending Customer </Col>
                <Col><Button
                    color={'danger'}
                    size={'sm'}
                    onClick={() =>
                        cb(email, false)
                    }>
                    Remove
                </Button></Col>
            </Row>

        </>
    } else {
        if (editMode) {
            return <>
                <h4>{email}</h4>


                <Row className="justify-content-end">
                    {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                    {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail}   </Col> : null}
                </Row>
                <Row className="justify-content-end">
                    {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                    {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
                </Row>

                <Row className="justify-content-end">
                    <Col className="list-unstyled text-right">
                        <li>
                            {
                                property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ?
                                    <>
                                        <Button size={'sm'} onClick={(e) => cbSendEmail(e, property)} >Send Email</Button> &nbsp;&nbsp;&nbsp;&nbsp;</> : null
                            }


                            {user !== null && user !== undefined && property.id === user.property.id ? <>  <Button
                                size={'sm'}
                                onClick={() => cbBusiness(email, property)}>
                                Business
                            </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                            </> : null

                            }
                            <Button
                                size={'sm'}
                                onClick={() => {
                                    cbBinding(email, property);
                                }}>
                                Info
                            </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                            {(property.usuage === 1 || property.usuage === 3) && !property.primary ? <Button
                                color={'danger'}
                                size={'sm'}
                                onClick={() =>
                                    cb(email, false)
                                }>
                                Remove
                            </Button> : null
                            }
                            {/* <Button
                                color={'primary'}
                                size={'sm'}
                                onClick={() =>
                                    changeColor(email)
                                }>
                                Color
                            </Button> &nbsp;&nbsp;&nbsp;&nbsp; */}
                            {/* {property.primary && loginType ? <Button
                                color={'primary'}
                                size={'sm'}
                                onClick={() =>
                                    cb(email, true)
                                }>
                                Change Location
                            </Button> : null
                            } */}
                        </li>
                    </Col>
                </Row>

            </>
        } else {
            if (property.is_business) {
                if (property.connected === "0") {
                    return <>
                        <h4>{email}</h4>


                        <Row className="justify-content-end">
                            {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                            {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail}   </Col> : null}
                        </Row>
                        <Row className="justify-content-end">
                            {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                            {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
                        </Row>
                        <Button
                            size={'sm'}
                            onClick={() => {
                                cbBusinessInfo(email, property);
                            }}>
                            Info
                        </Button>  </>
                } else {

                    return <>
                        <h4>{email}</h4>


                        <Row className="justify-content-end">
                            {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                            {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail}   </Col> : null}
                        </Row>
                        <Row className="justify-content-end">
                            {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                            {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
                        </Row>
                        <Button
                            size={'sm'}
                            onClick={() => {
                                cbBusinessInfo(email, property);
                            }}>
                            Info
                        </Button>
                    </>

                }
            } else {
                //This is personal ?
                if (!property.primary) {
                    return <>
                        <h4>{email}</h4>


                        <Row className="justify-content-end">
                            {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                            {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail}   </Col> : null}
                        </Row>
                        <Row className="justify-content-end">
                            {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                            {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
                        </Row>
                        <Row className="justify-content-end">
                            <Col className="list-unstyled text-right">
                                <li>
                                    <Button
                                        color={'danger'}
                                        size={'sm'}
                                        onClick={() =>
                                            cb(email, false)
                                        }>
                                        Remove
                                    </Button>

                                </li>
                            </Col>
                        </Row>
                    </>
                } else {
                    return <>
                        <h4>{email}</h4>


                        <Row className="justify-content-end">
                            {property.bindingName && property.bindingName !== null && property.bindingName !== 'null' ? <Col className='bindingInfo'>Name: {property.bindingName}  </Col> : null}
                            {property.bindingEmail && property.bindingEmail !== null && property.bindingEmail !== 'null' ? <Col className='bindingInfo'>Email: {property.bindingEmail}   </Col> : null}
                        </Row>
                        <Row className="justify-content-end">
                            {property.bindingPhone && property.bindingPhone !== null && property.bindingPhone !== 'null' ? <Col className='bindingInfo'>Phone: {property.bindingPhone}  </Col> : null}
                            {property.bindingOthers && property.bindingOthers !== null && property.bindingOthers !== 'null' ? <Col className='bindingInfo'>Others: {property.bindingOthers}  </Col> : null}
                        </Row>

                    </>
                }
            }
        }
    }

    ;
};

export default PropertiesTooltip;
