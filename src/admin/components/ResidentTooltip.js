import React from 'react';
import {Button, Col, Row} from 'reactstrap';

const ResidentTooltip = ({id, email,location,user, history}) => {
    const openGoogleMap =(location) =>{
        let url = `http://maps.google.com/maps?q=${location.latitude},${location.longitude}&ll=${location.latitude},${location.longitude}&z=18`;
        console.log('url=' + url);
        window.open(url);
    }
    return user!=null && user!=undefined ? (
        <>
            <h4>{user.firstName + ' ' + user.lastName}</h4>
            <h4>{user.mobileNumber}</h4>
            <div>{location.latitude+","+location.longitude }</div>
            <Row className="justify-content-center">
                <Col className="list-unstyled text-center">
                        <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() =>openGoogleMap(location)}>
                            View Map
                        </Button>
                </Col>
                <Col className="list-unstyled text-right">
                    <li>
                        <Button
                            color={'primary'}
                            size={'sm'}
                            onClick={() => history.push(`/admin/users/${id}`)}>
                            View User
                        </Button>
                    </li>
                </Col>
            </Row>
        </>
    ):(
        <>
        <h4>{email}</h4>
        <Row className="justify-content-center">
            <Col className="list-unstyled text-right">
                <li>
                    <Button
                        color={'primary'}
                        size={'sm'}
                        onClick={() => history.push(`/admin/users/${id}`)}>
                        View User
                    </Button>
                </li>
            </Col>
        </Row>
    </>
    );
};



export default ResidentTooltip;
