import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getHighRiseInfo, removeHighRiseBinding } from '../../../redux/actionCreators/adminActionCreators';
import {
    CDataTable,
} from '@coreui/react';
import { cancelShowHighRiseInfo } from '../../../redux/actionCreators/appActionCreators';
// import { generateString } from '../../../utils/utils';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toastr } from 'react-redux-toastr';
const ShowHighRiseInfo = () => {

    const PAGE_SIZE = 10;
    const utilsData = useSelector((state) => state.utilsData);
    // console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    // const history = useHistory();
    // const [color, setColor] = useState('default');
    const property = utilsData.selectedProperty;
    const user = useSelector((state) => state.auth.me);
    // console.log('..current property..', property);
    const [bindingInfo, setBindingInfo] = useState([])
    const [loading, setLoading] = useState(true);
    const [needReload, setNeedReload] = useState(false);
    useEffect(() => {
        setLoading(true);
        let email = property.email;
        console.log('..property..', property);
        email = email.replace(property.unit_no.trim().replace(/[ ]/g, '-') + '-', '')
        console.log('..email is..' + email)

        dispatch(getHighRiseInfo(email)).then(resp => {
            // console.log('.. get high rise info..', resp.value.value);
            const unitsInfo = resp.value.value;
            // let itemData = []
            // unitsInfo.map(item => {
            //     // console.log('..item..', item);
            //     if (parseInt(item.property_id) === property.id) {
            //         if (item.binding_unit_num === "") item.binding_unit_num = property.unit_no;
            //         if (item.binding_email === "") item.binding_email = user.email;
            //         // if (item.bindingName === "") item.bindingName = user.email;
            //         if (item.binding_phone === "") item.binding_phone = user.username;
            //     }
            //     itemData.push(item);
            // })
            // console.log('..itemData..', itemData);
            setBindingInfo(unitsInfo);
            setLoading(false);
        })

            ;
        return () => { };
    }, [dispatch,]);

    const onClickDelete = (event, id) => {
        console.log('...onClickDeleteContact...' + id);
        // navigate('/edit/contact/' + id);
        toastr.confirm(
            'Are you sure you want to delete your this record? This action is irreversible!',
            {
                onOk: () => onConfirmDelete(id),
            },
        );
    };
    const onConfirmDelete = (id) => {
        console.log('..delete..' + id);
        dispatch(removeHighRiseBinding(user.id, id)).then(resp => {
            console.log('..remove high rise binding..', resp);
            //reload page
            let email = property.email;
            email = email.replace(property.unit_no + '-', '')
            console.log('..email is..' + email)

            dispatch(getHighRiseInfo(email)).then(resp => {
                const unitsInfo = resp.value.value;
                setBindingInfo(unitsInfo);
                setLoading(false);
                setNeedReload(true);
            })
        })

    };
    const columns = [
        {
            Header: "Del",
            accessor: "userPropertyId",
            width: 60,
            Cell: row => (
                <>
                    <img src="/images/buttons/delete.png" style={{ marginLeft: "20px" }} onClick={(event) => onClickDelete(event, row.value)} />
                </>
            ),
        },
        {
            accessor: 'binding_unit_num',
            Header: 'Unit #',
            width: 80,

        },
        {
            accessor: 'binding_name',
            Header: 'Name',
            minWidth: 140,

        },
        {
            accessor: 'binding_email',
            Header: 'Email',
            minWidth: 200,

        },
        {
            accessor: 'binding_phone',
            Header: 'Phone',
            minWidth: 120,
        },
        {
            accessor: 'binding_others',
            Header: 'Others',
        }
    ]

    return (
        <Col md={7} sm={24} xs={12} className="overlay-form-container-left">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row style={{ marginLeft: "15px", marginRight: "15px" }} >
                <Col className="highRise_table" style={{ textAlign: "left" }}>
                    <h5> &nbsp;&nbsp;&nbsp; {property.street_number + ' ' + property.route + ' , ' + property.locality} </h5>
                    {/* <CDataTable
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


                    /> */}
                    <ReactTable
                        data={bindingInfo}
                        columns={columns}
                        defaultPageSize={10}
                        className="-striped -highlight"
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
                            if (needReload) {
                                location.reload();
                            }
                        }}>
                        Cancel
                    </Button>
                </Col>
            </Row>

        </Col>
    );
};
export default ShowHighRiseInfo;