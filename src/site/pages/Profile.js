import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {Redirect, Switch, useHistory, useLocation} from 'react-router';
import {Link, Route} from 'react-router-dom';
import {Col, Container, Nav, NavItem, NavLink, Row} from 'reactstrap';
import MapProvider from '../../common/contexts/MapContext/MapProvider';
import {deleteAccount} from '../../redux/actionCreators/appActionCreators';
import HomeLayout from '../layouts/HomeLayout';
import EditInmate from './profile/EditInmate';
import EditProperty from './profile/EditProperty';
import Inmates from './profile/Inmates';
import ViewInmate from './profile/ViewInmate';
import ViewProperty from './profile/ViewProperty';
import UserProperties from './profile/Properties';
import EditUserProperty from './profile/EditUserProperty';
import ViewPropertiesAtMap from './profile/ViewPropertiesAtMap';
import {logoutUser} from '../../redux/actionCreators/authActionCreators';
// import {toastr} from 'react-redux-toastr';

const Profile = () => {
    const {pathname} = useLocation();

    const dispatch = useDispatch();
    const history = useHistory();

    const onClickDeleteAccount = useCallback(() => {
        dispatch( deleteAccount()).then(({value:retObj}) => {
            console.log('....delete acount return...' + JSON.stringify(retObj));
            if(retObj.status==='successed'){
                dispatch(logoutUser()).then(()=>{
                    history.push('/');
                });
            }else{
                console.log('error message:' + retObj.message);
                toastr.error('Error !',retObj.message);
            }
        });
    }, [dispatch, history]);

    return (
        <HomeLayout>
            <div className="full-screen">
                <Container>
                    <Row className="h-100 pt-3 pb-3">
                        <Col md={3} sm={12}>
                            <Nav vertical>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to={'/profile/property'}
                                        active={
                                            pathname ===
                                            '/profile/view-property'
                                        }>
                                        Property
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to={'/profile/additional-address'}
                                        active={
                                            pathname ===
                                            '/profile/additional-address'
                                        }>
                                        Addresses / Residents
                                    </NavLink>
                                </NavItem>

                                

                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to={'/profile/edit-property'}
                                        active={
                                            pathname ===
                                            '/profile/edit-property'
                                        }>
                                        Change My Address
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="text-danger"
                                        onClick={() => {
                                            toastr.confirm(
                                                'Are you sure you want to delete your account? This action is irreversible!',
                                                {
                                                    onOk: onClickDeleteAccount,
                                                },
                                            );
                                        }}>
                                        Delete My Account
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col md={9} sm={12}>
                            <Switch>
                                <Route
                                    component={Inmates}
                                    path={'/profile/other-residents'}
                                    exact
                                />
                                <Route
                                    component={Inmates}
                                    path={'/profile/other-residents/:id'}
                                    exact
                                />
                                <Route
                                    component={EditInmate}
                                    path={'/profile/other-resident/edit/:id'}
                                    exact
                                />
                                 <Route
                                    component={UserProperties}
                                    path={'/profile/additional-address'}
                                    exact
                                />
                                
                                <Route
                                    component={ViewInmate}
                                    path={'/profile/other-resident/view/:id'}
                                    exact
                                />
                                <Route
                                    component={EditInmate}
                                    path={'/profile/other-resident/new'}
                                    exact
                                />
                                <Route
                                    component={() => (
                                        <MapProvider>
                                            <EditProperty />
                                        </MapProvider>
                                    )}
                                    path={'/profile/edit-property'}
                                    exact
                                />
                                <Route
                                    component={() => (
                                        <MapProvider>
                                            <ViewProperty />
                                        </MapProvider>
                                    )}
                                    path={'/profile/view-property'}
                                    exact
                                />


            <Route
                component={(props) => (
                    <MapProvider>
                        <EditUserProperty {...props} />
                    </MapProvider>
                )}    
                path={`/profile/user-property/new/`}
                exact
            />   
            <Route
                component={(props) => (
                    <MapProvider>
                        <EditUserProperty {...props} />
                    </MapProvider>
                )}
                path={'/profile/user-property/edit/:id'}
                exact
            />    
            <Route
                component={Inmates}
                path={`/profile/residents/:id`}
                exact
            />    
            <Route
                component={EditInmate}
                path={`/profile/resident/new/`}
                exact
            />       
            <Route
                component={EditInmate}
                path={`/profile/resident/edit/:id`}
                exact
            />      
             <Route
                component={ViewInmate}
                path={'/profile/resident/view/:id'}
                exact
            />       
             <Route
                component={(props) => (
                    <MapProvider>
                        <ViewPropertiesAtMap {...props} />
                    </MapProvider>
                )}
                path={'/profile/view-all-properties'}
                exact
            />   



                                <Redirect
                                    from={'/profile'}
                                    to={'/profile/view-property'}
                                />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        </HomeLayout>
    );
};

export default Profile;
