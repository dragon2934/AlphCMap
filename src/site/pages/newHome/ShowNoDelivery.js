import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    CDataTable,
} from '@coreui/react';
import { cancelShowNoDelivery } from '../../../redux/actionCreators/appActionCreators';
import { removeNoDelivery } from '../../../redux/actionCreators/adminActionCreators';

// import { generateString } from '../../../utils/utils';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toastr } from 'react-redux-toastr';
const ShowNoDelivery = () => {

    const PAGE_SIZE = 10;
    const utilsData = useSelector((state) => state.utilsData);
    // console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    // const history = useHistory();
    // const [color, setColor] = useState('default');
    const properties = utilsData.properties;
    const user = useSelector((state) => state.auth.me);
    // console.log('..current user..', user);
    const [bindingInfo, setBindingInfo] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        // })
        let itemData = []
        properties.map(item => {
            if (item.properties.no_delivery === 1) {
                itemData.push(item.properties)
            }
        });
        console.log('..', itemData);
        setBindingInfo(itemData);
        return () => { };
    }, [dispatch,]);

    const onClickDelete = (event, id) => {
        // console.log('...onClickDeleteContact...' + id);
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
        dispatch(removeNoDelivery(id, user.id)).then(resp => {
            console.log('..remove high rise binding..', resp);
            //reload page
            let itemData = []
            properties.map(item => {
                if (item.properties.no_delivery === 1 && item.properties.user_id !== id) {
                    itemData.push(item.properties)
                }
            });
            console.log('..', itemData);
            setBindingInfo(itemData);
        })
    };
    const columns = [
        {
            Header: "Operate",
            accessor: "user_id",
            Cell: row => (
                <>
                    <img src="/images/buttons/delete.png" onClick={(event) => onClickDelete(event, row.value)} />
                </>
            ),
        },
        {
            accessor: 'bindingName',
            Header: 'Name',

        },
        {
            accessor: 'bindingEmail',
            Header: 'Email',

        },
        {
            accessor: 'bindingPhone',
            Header: 'Phone',
        }
    ]

    return (
        <Col md={4} sm={12} xs={12} className="overlay-form-container-left">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row >
                <Col style={{ textAlign: "left" }}>
                    <h5> No Delivery User Information </h5>
                    {/* <CDataTable
                        items={bindingInfo}
                        loading={loading}
                        fields={[
                            { key: 'bindingName', label: 'Name' },
                            { key: 'bindingEmail', label: 'Email' },
                            { key: 'bindingPhone', label: 'Phone' },
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
                            utilsData.showNoDelivery = false;
                            dispatch(cancelShowNoDelivery());
                            location.reload();
                        }}>
                        Cancel
                    </Button>
                </Col>
            </Row>

        </Col>
    );
};
export default ShowNoDelivery;