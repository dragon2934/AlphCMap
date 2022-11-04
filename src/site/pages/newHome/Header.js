import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {NavLink as ReactRouterLink} from 'react-router-dom';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';

const Header = () => {
    const user = useSelector((state) => state.auth.user);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const collapse = () => setIsOpen(false);

    let userName = '';

    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
    } catch (e) {}

    if(user!=null){
        console.log('role =' + user.role.name);
    }
    const adminGroup = [process.env.REACT_APP_ROLE_ADMIN_NAME,process.env.REACT_APP_ROLE_PM_NAME];
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
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/about-us">
                            About us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/how-it-works">
                            How it works
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/patents">
                            Patents
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/app-introduction">
                            Mobile Apps
                        </NavLink>
                    </NavItem>
                    {user ? (
                        <>
                            { adminGroup.includes(user.role.name) && (
                                <NavItem>
                                    <NavLink href="/admin">Admin</NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                <NavLink
                                    tag={ReactRouterLink}
                                    onClick={collapse}
                                    to="/profile">
                                    My Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={ReactRouterLink}
                                    onClick={collapse}
                                    to="/logout">
                                    Logout(
                                    {userName ? userName : user.mobileNumber})
                                </NavLink>
                            </NavItem>
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
