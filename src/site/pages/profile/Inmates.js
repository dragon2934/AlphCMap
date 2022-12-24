import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchInmates, getUserPropertyById } from '../../../redux/actionCreators/appActionCreators';
import { isAppEmbedWebview } from '../../../utils/utils';
import { useHistory } from 'react-router';
const Inmates = ({
    match: {
        params: { id },
    },
}) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.auth.me);
    const [isPrimaryHolder, setIsPrimaryHolder] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);


    useEffect(() => {
        dispatch(fetchInmates(id)).then(({ value: users }) => {
            setUsers(users);

            const user = users.find(u => {
                return u.id === currentUser.id;
            });
            // console.log('find .....user..'+ JSON.stringify(user));
            if (user && user.primaryHolder) {
                console.log(' I am primary holder');
                setIsPrimaryHolder(true);
            }
            setLoading(false);
        });
    }, [dispatch]);

    // const viewThisUser=(userId,propertyId)=>{
    //     console.log('view this user');
    //     history.push(`/mobile-resident/view/${userId}?propertyId=`+propertyId);
    // }

    if (id === null || id === undefined) id = currentUser.property.id;
    ////Get Property....
    useEffect(() => {
        dispatch(getUserPropertyById(id)).then(({ value: property }) => {
            console.log('property...' + JSON.stringify(property));
            setCurrentProperty(property);
        });
    }, [dispatch]);
    return (
        <>
            <Card>
                <CardBody>
                    {
                        currentProperty == null ? null :
                            (
                                <>
                                    <tr>
                                        <td>
                                            <b>{currentProperty.primaryHolder ? 'Primary Address' : 'Secondary Address'} </b> <br />
                                            {currentProperty.unitNo != null && currentProperty.unitNo != undefined && currentProperty.unitNo.length > 0 ? currentProperty.unitNo + ' - ' : ''}  {currentProperty.streetNumber} {currentProperty.route} {currentProperty.locality} <br /> {currentProperty.postalCode}
                                            <br />

                                        </td></tr>
                                </>
                            )
                    }
                </CardBody>
            </Card>


            <Card>
                <CardHeader>Other Residents</CardHeader>
                <CardBody>
                    {loading ? (
                        <div className="text-center">
                            <Spinner size={'sm'} />
                        </div>
                    ) : (isAppEmbedWebview()) ?
                        (


                            <Table striped>
                                {/* <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead> */}
                                <tbody>


                                    {users.map((user) => (
                                        <>
                                            <tr >
                                                <td onClick={() => {
                                                    history.push(`/mobile-resident/view/${user.id}?propertyId=` + id);
                                                }}> <i class="fa-solid fa-address-card"></i> &nbsp;&nbsp; {user.firstName} {user.lastName}
                                                    <br /> <i class="fa-solid fa-at"></i> &nbsp;&nbsp;{user.email}
                                                    <br /> <i class="fa-solid fa-phone"></i> &nbsp;&nbsp;{user.mobileNumber}</td>
                                                {/* <td>
                                           <Button
                                                tag={Link}
                                                color={'primary'}
                                                to={`/mobile-resident/view/${user.id}?propertyId=`+id}>
                                                View
                                            </Button>
                                        </td> */}
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Mobile Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {users.map((user) => (
                                        <>
                                            <tr>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.mobileNumber}</td>
                                                <td>
                                                    <Button
                                                        tag={Link}
                                                        color={'primary'}
                                                        to={`/profile/other-resident/view/${user.id}?propertyId=` + id}>
                                                        View
                                                    </Button>

                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        )
                    }
                </CardBody>
                <CardFooter>
                    {isPrimaryHolder ? users != null && users != undefined && users.length >= 8 ? null : isAppEmbedWebview() ? <Button
                        block
                        tag={Link}
                        color={'success'}
                        to={`/mobile-resident/new?propertyId=` + id}>
                        Add Resident
                    </Button> : <Button
                        block
                        tag={Link}
                        color={'success'}
                        to={`/profile/other-resident/new?propertyId=` + id}>
                        Add Resident
                    </Button> : null
                    }

                    {isAppEmbedWebview() && (id !== null && id !== undefined) ? <Button
                        className="mt-1"
                        block
                        tag={Link}
                        to={`/mobile-user-properties`}>
                        Back
                    </Button> : null}
                </CardFooter>
            </Card>
        </>
    );
};

export default Inmates;
