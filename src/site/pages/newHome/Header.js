import React, { useState, useCallback } from "react";
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
import { getLoginType, clearLoginType } from '../../../utils/utils';

const Header = () => {
    const user = useSelector((state) => state.auth.me);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const collapse = () => setIsOpen(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const utilsData = useSelector((state) => state.utilsData);
    const [editSwitch, setEditSwitch] = useState(false);

    const dispatch = useDispatch();

    let userName = '';
    let userEmail = '';
    let loginType = 0;

    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
    } catch (e) { }


    if (user !== null && user !== undefined && user.property !== null && user.property !== undefined) {
        //  console.log('user.property =' + JSON.stringify(user.property));
        loginType = getLoginType();
        // console.log('..loginType=..' + loginType);
        if (user.companyName) {
            userEmail = user.property.email + '@' + user.companyName + '.com';
            localStorage.setItem("current_domain", user.companyName + '.com');
        } else if (user.lastName) {
            userEmail = user.property.email + '@' + user.lastName + '.com';
            localStorage.setItem("current_domain", user.lastName + '.com');
        }

    } else {
        userEmail = 'Enter your address to create your account';
    }
    const toggleDropDownMenu = useCallback(() => {
        setDropDownOpen(!dropDownOpen)
    });
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
        dispatch(deleteAccount()).then(({ value: retObj }) => {
            console.log('....delete acount return...' + JSON.stringify(retObj));
            clearLoginType();
            if (retObj.status === 'successed') {
                dispatch(logoutUser()).then(() => {
                    // history.push('/');
                    localStorage.removeItem("current_domain");
                    setTimeout(() => {
                        location.reload(true);
                    }, 500);

                });
            } else {
                console.log('error message:' + retObj.message);
                toastr.error('Error !', retObj.message);
            }
        });
    }, [dispatch, history]);
    const adminGroup = [process.env.REACT_APP_ROLE_ADMIN_NAME, process.env.REACT_APP_ROLE_PM_NAME];
    const menuLinks = [
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
                <div style={{ width: "64%", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}> {userEmail} </div>
                <Nav className="ml-auto" navbar>
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
                    {/* <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/pricing">
                            Pricing
                        </NavLink>
                    </NavItem> */}
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
