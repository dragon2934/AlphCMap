import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {
    deleteContact,
    fetchContact,
} from '../../../redux/actionCreators/adminActionCreators';
import {toastr} from 'react-redux-toastr';

const Contact = ({match}) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [record, setRecord] = useState(null);

    useEffect(() => {
        if (match.params.id)
            dispatch(fetchContact(match.params.id)).then(({value: record}) =>
                setRecord(record),
            );
    }, [dispatch, match.params.id]);

    const onClickDeleteContact = useCallback(() => {
        toastr.confirm(
            'Are you sure you want to delete this contact? This action is irreversible!',
            {
                onOk: () => {
                    dispatch(deleteContact(match.params.id)).then(() => {
                        history.push('/admin/contacts');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id]);

    if (!record) return null;

    const contact = {
        id: record.id,
        email: record.email,
        phone: record.phone,
        name: record.name,
        createdAt: record.createdAt,
        message: record.message,
    };

    const contactDetails = contact
        ? Object.entries(contact)
        : [
              [
                  'id',
                  <span>
                      <CIcon className="text-muted" name="cui-icon-ban" /> Not
                      found
                  </span>,
              ],
          ];

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Contact id: {match.params.id}
                        <div className="card-header-actions">
                            <CButton
                                onClick={onClickDeleteContact}
                                className="btn-ghost-danger h-auto"
                                size={'sm'}>
                                Delete Contact
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-striped table-hover">
                            <tbody>
                                {contactDetails.map(([key, value], index) => {
                                    return (
                                        <tr key={index.toString()}>
                                            <td>{`${key}:`}</td>
                                            <td>
                                                <strong>{value}</strong>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Contact;
