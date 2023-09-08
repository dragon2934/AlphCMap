import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as ReactRouterLink, useHistory } from "react-router-dom";
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Button,
    ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown
} from 'reactstrap';

import Toggle from '../../components/Toggle';
import { setEditMode } from '../../../redux/actionCreators/registrationActionCreators';
import { deleteAccount } from '../../../redux/actionCreators/appActionCreators';
import { logoutUser } from '../../../redux/actionCreators/authActionCreators';
import { toastr } from 'react-redux-toastr';
import { getLoginType, setLoginType, clearLoginType, checkUseLevel } from '../../../utils/utils';
import { loadConnectedTotal, sendPasswordBeforeDeleteAccount } from '../../../redux/actionCreators/adminActionCreators';
// import { useMitt } from 'react-mitt'
import EventBus from '../../../utils/eventBus';
import { showPreferenceForm } from "../../../redux/actionCreators/appActionCreators";
const Header = () => {
    const user = useSelector((state) => state.auth.me);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const collapse = () => setIsOpen(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const utilsData = useSelector((state) => state.utilsData);
    const [editSwitch, setEditSwitch] = useState(utilsData.editMode);
    // const { emitter } = useMitt();
    const dispatch = useDispatch();

    let userName = '';
    let userEmail = '';
    let loginType = 0;
    const [totalConnected, setTotalConnected] = useState(null);

    useEffect(() => {

        EventBus.$on('onTotalConnectChange', (data) => {
            console.log(data);
            const data1 = totalConnected;
            if (totalConnected) {
                const data2 = data.totalConnected;
                console.log(' .. data1..' + data1 + ' ..data2.. ' + data2);
                setTotalConnected(parseInt(data1) + parseInt(data2));
            }
        })
        return () => {

        };
    }, [totalConnected]);

    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
    } catch (e) { }
    loginType = getLoginType();
    // console.log('...loginType=' + loginType);
    // const [connectionSwitch, setConnectionSwitch] = useState(parseInt(loginType) === 2 ? true : false);
    let roleName = ''
    if (user !== null && user !== undefined && user.property !== null && user.property !== undefined) {
        // console.log('user =' + JSON.stringify(user));
        roleName = user.role.name;
        // console.log('..loginType=..' + loginType);
        if (user.companyName) {
            userEmail = user.property.email + '@' + user.companyName + '.com';
            localStorage.setItem("current_domain", user.companyName + '.com');
        } else if (user.lastName) {
            userEmail = user.property.email + '@' + user.lastName + '.com';
            localStorage.setItem("current_domain", user.lastName + '.com');
        } else {
            userEmail = user.property.email + '@klosertoyou.com';
            localStorage.setItem("current_domain", 'klosertoyou.com');
        }
        if (user.noDelivery && user.noDelivery === 1) {
            userEmail = '';
        }


    } else {
        userEmail = 'Enter your address to create your account';
    }
    useEffect(() => {
        if (user && parseInt(loginType) === 2) {
            const jsonData = {
                id_type: 0,
                id: user.id
            }
            dispatch(loadConnectedTotal(jsonData)).then(resp => {
                console.log('..get total ..' + JSON.stringify(resp));
                let total1 = parseInt(resp.value.value[0].iCount) + parseInt(resp.value.value2) + parseInt(resp.value.value3[0].iCount);
                setTotalConnected(total1 > 0 ? total1 : 0);
            }).catch(error => {

            });
        }
    }, [dispatch, loginType]);
    const toggleDropDownMenu = useCallback(() => {
        setDropDownOpen(!dropDownOpen)
    });
    // const handleConnectionChange = useCallback(() => {
    //     if (connectionSwitch) {
    //         setLoginType(1);
    //     } else {
    //         setLoginType(2);
    //     }
    //     window.location.reload();
    // });
    const handleEditModeChange = useCallback(() => {
        // setEditMode(!editMode);
        if (utilsData.drawing) {
            toastr.error('Error', 'Drawing addresses boundary, can not switch');
            return;
        }
        utilsData.editMode = !editSwitch;
        if (utilsData.editMode) {
            console.log('...edit mode is enable !!!!..');
        } else {
            console.log('...edit mode is turn off !!!..');
        }

        setEditSwitch(utilsData.editMode);
        const data = {
            utilsData: {
                editMode: !editSwitch
            }
        };
        dispatch(setEditMode(data));

    });
    const onClickDeleteAccount = useCallback(() => {

        dispatch(sendPasswordBeforeDeleteAccount()).then(({ value: retObj }) => {
            console.log('..retObj..' + JSON.stringify(retObj));
            const token = prompt('Please enter the verify code from your e-mail');
            if (token) {
                dispatch(deleteAccount(token)).then(({ value: retObj }) => {
                    console.log('....delete acount return...' + JSON.stringify(retObj));
                    clearLoginType();
                    if (retObj.status === 'successed') {
                        dispatch(logoutUser()).then(() => {
                            // history.push('/');
                            localStorage.removeItem("current_domain");
                            setTimeout(() => {
                                window.location.href = '/';
                                location.reload(true);
                            }, 500);

                        });
                    } else {
                        console.log('error message:' + retObj.message);
                        toastr.error('Error !', retObj.error.details[0].messages[0].message);
                    }
                });
            }
        });
    }, [dispatch, history]);
    const adminGroup = [process.env.REACT_APP_ROLE_ADMIN_NAME, process.env.REACT_APP_ROLE_PM_NAME];
    const menuLinks = parseInt(loginType) === 1 ? [
        { menuText: 'Change Address', menuID: 1 },
        { menuText: 'Change Email', menuID: 2 },
        { menuText: 'Change Mobile', menuID: 3 },
        { menuText: 'Change Password', menuID: 6 },
        { menuText: 'Preference', menuID: 7 },
        { menuText: 'Delete Account', menuID: 4 },
        { menuText: 'logout', menuID: 5 },

    ] : [
        { menuText: 'Change Address', menuID: 1 },
        { menuText: 'Change Email', menuID: 2 },
        { menuText: 'Change Mobile', menuID: 3 },
        { menuText: 'Change Password', menuID: 6 },
        { menuText: 'Delete Account', menuID: 4 },
        { menuText: 'logout', menuID: 5 },

    ]
    return (
        <Navbar className="header fixed-top" color="light" light expand="md">
            <NavbarBrand className="pixels" href="mailto:anything@AlphC.com">
                <img src={'/assets/img/logo2.png'} alt={'logo2'} />
            </NavbarBrand>
            <NavbarBrand tag={ReactRouterLink} className="mr-auto" to="/">
                <img src={'/assets/img/logo-alphc.png'} alt={'logo'} />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} tag={'div'}>
                <i className="fa fa-bars" />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
                <div style={{ width: "64%", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}> {userEmail}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {totalConnected ? 'Connected:' + totalConnected : ''} </div>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {/* {user ? <Toggle
                            checked={connectionSwitch}
                            text="Connect Mode"
                            size="default"
                            disabled={false}
                            onChange={handleConnectionChange}
                            offstyle="btn-danger"
                            onstyle="btn-success"
                        /> : null} */}
                        {
                            user ? <div style={{ marginTop: "10px", fontSize: "14px" }}>Connect Mode</div> : null
                        }

                    </NavItem>
                    <NavItem>
                        {user && parseInt(loginType) === 2 ? <Toggle
                            checked={editSwitch}
                            text="Edit Mode"
                            size="default"
                            disabled={false}
                            onChange={handleEditModeChange}
                            offstyle="btn-danger"
                            onstyle="btn-success"
                        /> : null}
                    </NavItem>
                    {checkUseLevel(roleName) === 1 ? <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/admin/users">
                            Admin
                        </NavLink>
                    </NavItem> : null}
                    <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/patents">
                            Patents
                        </NavLink>
                    </NavItem>
                    {user ? (
                        <>

                            <ButtonDropdown >
                                <Dropdown isOpen={dropDownOpen} toggle={toggleDropDownMenu} >
                                    <DropdownToggle className="head-dropdown-toggle">
                                        Menu
                                    </DropdownToggle>
                                    <DropdownMenu className="city-dropdown">
                                        {
                                            menuLinks.map(menu => {
                                                return <DropdownItem key={'key' + menu.menuID} onClick={() => {
                                                    // setSelectedCity(city.full_name);
                                                    console.log('selected menu..' + menu.menuID);
                                                    switch (menu.menuID) {
                                                        case 1:
                                                            history.push('/edit-property');
                                                            break;
                                                        case 2:
                                                            history.push('/change-email');
                                                            break;
                                                        case 3:
                                                            history.push('/change-mobile');
                                                            break;
                                                        case 4:
                                                            //delete account
                                                            toastr.confirm(
                                                                'Are you sure you want to delete your account? This action is irreversible!',
                                                                {
                                                                    onOk: onClickDeleteAccount,
                                                                },
                                                            );
                                                            break;
                                                        case 5:
                                                            localStorage.removeItem("current_domain");
                                                            clearLoginType();
                                                            history.push('/logout')
                                                            break;
                                                        case 6:
                                                            history.push('/change-password');
                                                            break;
                                                        case 7:
                                                            // history.push('/change-password');
                                                            utilsData.showPreference = true;
                                                            dispatch(showPreferenceForm());
                                                            break;
                                                    }
                                                    // localStorage.setItem('city_short_name',city.short_name);
                                                    // localStorage.setItem('city_full_name',city.full_name);
                                                    // //do search
                                                    // window.location.reload();
                                                }
                                                } >{menu.menuText}</DropdownItem>
                                            })
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </ButtonDropdown>

                            {/* <NavItem>
                                <NavLink
                                    tag={ReactRouterLink}
                                    onClick={collapse}
                                    to="/logout">
                                    Logout(
                                    {userName ? userName : user.mobileNumber})
                                </NavLink>
                            </NavItem> */}
                        </>
                    ) : (
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/login">
                                Login
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;
