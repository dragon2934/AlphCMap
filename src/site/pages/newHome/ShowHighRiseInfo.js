import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getHighRiseInfo, } from '../../../redux/actionCreators/adminActionCreators';
import {
    CDataTable,
} from '@coreui/react';
import { cancelShowHighRiseInfo } from '../../../redux/actionCreators/appActionCreators';
// import { generateString } from '../../../utils/utils';
const ShowHighRiseInfo = () => {

    const PAGE_SIZE = 10;
    const utilsData = useSelector((state) => state.utilsData);
    // console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    // const history = useHistory();
    // const [color, setColor] = useState('default');
    const property = utilsData.selectedProperty;
    const [bindingInfo, setBindingInfo] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        let email = property.email;
        email = email.replace(property.unit_no + '-', '')
        console.log('..email is..' + email)

        dispatch(getHighRiseInfo(email)).then(resp => {
            console.log('.. get high rise info..', resp.value.value);
            setBindingInfo(resp.value.value);
            setLoading(false);
        })

            ;
        return () => { };
    }, [dispatch,]);


    return (
        <Col md={6} sm={12} xs={12} className="overlay-form-container-left">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row >
                <Col style={{ textAlign: "left" }}>
                    <CDataTable
                        items={bindingInfo}
                        loading={loading}
                        fields={[
                            { key: 'binding_unit_num', _classes: 'font-weight-bold', label: 'Unit #' },
                            { key: 'binding_name', label: 'Name' },
                            { key: 'binding_email', label: 'Email' },
                            { key: 'binding_phone', label: 'Phone' },
                            { key: 'binding_others', label: 'Others' },
                        ]}
                        hover
                        striped
                        itemsPerPage={PAGE_SIZE}
                        pagination


                    />

                </Col>
            </Row>
            <Row >
                <Col style={{ textAlign: "center" }}>
                    <Button
                        className="mt-1 mb-5"
                        color={'danger'}
                        block
                        onClick={() => {
                            // const data = {
                            //     email: utilsData.emailForChangeColor,
                            //     color: color
                            // };
                            utilsData.showHighRiseInfo = false;
                            dispatch(cancelShowHighRiseInfo());
                        }}>
                        Cancel
                    </Button>
                </Col>
            </Row>

        </Col>
    );
};
export default ShowHighRiseInfo;