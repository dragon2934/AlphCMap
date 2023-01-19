import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spinner,
    Table,
} from 'reactstrap';
import {
    deleteInmate,
    getInmate,
} from '../../../redux/actionCreators/appActionCreators';
import { isAppEmbedWebview } from '../../../utils/utils';

const ViewInmate = ({
    match: {
        params: { id },
    },
}) => {
    const [user, setUser] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(!!id);
    const currentUser = useSelector((state) => state.auth.me);
    const history = useHistory();
    if (currentUser === null || currentUser === undefined) {
        //back to login
        history.push('/login');
    }

    const dispatch = useDispatch();

    const [isPrimaryHolder, setIsPrimaryHolder] = useState(false);

    const getPropertyId = () => {
        let propertyId = currentUser.property.id;
        const query = new URLSearchParams(window.location.search);

        if (query != null && query !== undefined) {
            const pid = query.get('propertyId');
            // console.log('pid ==' + pid);
            propertyId = pid;
        }
        return propertyId;
    }
    useEffect(() => {
        if (id) {
            const propertyId = getPropertyId();
            dispatch(getInmate(id, propertyId)).then(({ value: user }) => {
                setUser(user);
                console.log(' get this inmate ....' + JSON.stringify(user));
                setIsPrimaryHolder(user.currentUserIsPrimaryHolder);
                setLoading(false);
            });
        }
    }, [dispatch, id]);

    const isDeleteAble = (id) => {
        if (isPrimaryHolder) {
            if (id != null && id != undefined && id === currentUser.id && currentUser.property.id == getPropertyId()) {
                console.log('xxxx===1111 ****');
                return false;
            }
            console.log(' return true 1....');
            return true;
        }
        if (id != null && id != undefined && id === currentUser.id) {
            if (currentUser.property.id == getPropertyId()) {
                console.log('xxxx===2222 ****');
                return false;
            }
            console.log(' return true 2....');
            return true;
        }
        return false;
    }

    const onClickDeleteInmate = useCallback(() => {
        setDeleting(true);
        const propertyId = getPropertyId();
        dispatch(deleteInmate(id, propertyId)).then(() => {


            if (isAppEmbedWebview()) {
                history.push(`/mobile-residents/` + propertyId);
            } else {
                history.push(`/profile/other-residents/` + propertyId);
            }

        });
    }, [dispatch, history, id]);

    return (
        <Card>
            <CardHeader>User Info</CardHeader>
            <CardBody className={'profile-content-user-card'}>
                {loading && (
                    <div className="text-center">
                        <Spinner size={'sm'} />
                    </div>
                )}
                {!loading && (
                    <Table striped>
                        <tbody>
                            <tr>
                                <th scope="row">Mobile Number</th>
                                <td>{user.mobileNumber}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">First Name</th>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Last Name</th>
                                <td>{user.lastName}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </CardBody>
            <CardFooter>

                {isPrimaryHolder || (id != null && id != undefined && id === currentUser.id) ? isAppEmbedWebview() ? <Button
                    block
                    tag={Link}
                    color={'success'}
                    to={`/mobile-resident/edit/${id}?propertyId=` + getPropertyId()}>
                    Edit
                </Button> : <Button
                    block
                    tag={Link}
                    color={'success'}
                    to={`/profile/other-resident/edit/${id}?propertyId=` + getPropertyId()}>
                    Edit
                </Button> : null
                }
                {/* 
 删除逻辑: 只有 primary holder 可以删除别人，
 自己在 Primay / Secondary 的情况下，可以删除自己，
 但在自己注册的 property，不能删除自己 
 流程： 先判断当前登录用户是否是该 Property 的 Primary Holder
 如果是，可以删除
 如果该用户是 Main Registered Address & Secondary, 不能删除别人和自己
 
 */}

                {isDeleteAble(id) ? <Button
                    block
                    color={'danger'}
                    onClick={() => onClickDeleteInmate()}
                    disabled={deleting}>
                    {deleting ? <Spinner size={'sm'} /> : 'Delete'}
                </Button> : null
                }
                {isAppEmbedWebview() ? <Button
                    className="mt-1"
                    block
                    tag={Link}
                    to={`/mobile-residents/` + getPropertyId()}>
                    Back
                </Button> : null}
            </CardFooter>
        </Card>
    );
};

export default ViewInmate;
