import { CButton } from '@coreui/react';
import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {useSelector, useDispatch } from 'react-redux';

const PropertiesTooltip = ({id, email,property, cb,changeColor, editMode,cbBinding,cbSendEmail}) => {
    // console.log('..property..' + JSON.stringify(property))
    // const utilsData = useSelector((state) => state.utilsData);
    const sendEmail = (e) => {
        const utilsData = useSelector((state) => state.utilsData);
        utilsData.drawFinished = true;
        utilsData.selectedProperty = property;
    }
    return (
        <>
            <h4>{email}</h4>
            
        <Row className="justify-content-end">
{ property.bindingName ? <Col className='bindingInfo'>Name: { property.bindingName }  </Col> : null }
{ property.bindingEmail ? <Col className='bindingInfo'>Email: { property.bindingEmail } <CButton onClick={ (e) => cbSendEmail(e,property)} >Send Email</CButton>  </Col> : null } 
</Row>
<Row className="justify-content-end">
{ property.bindingPhone ? <Col className='bindingInfo'>Phone: { property.bindingPhone }  </Col> : null }
{ property.bindingOthers ? <Col className='bindingInfo'>Others: { property.bindingOthers }  </Col> : null }
        </Row>  
          { editMode ? 
          <>
          <Row className="justify-content-end">
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
            </Row>
           
            </>
             : null }
        </>
    );
};

export default PropertiesTooltip;
