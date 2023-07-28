import React, { useState } from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const collapse = () => setIsOpen(false);

    return (
        <Navbar className="footer fixed-bottom" color="dark" dark expand="md">
            <Collapse isOpen={isOpen} navbar>
                <Navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/our-story">
                                Our Story
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/our-promise">
                                Our Promise
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/contact-us">
                                Contact us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/news-release">
                                News Release
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/our-video">
                                Our Video
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
                                to="/about-us">
                                About KloserToYou
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto mr-2" navbar>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/privacy-policy">
                                Privacy Policy
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={ReactRouterLink}
                                onClick={collapse}
                                to="/terms-of-use">
                                Terms of Use
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Collapse>
            <NavbarToggler onClick={toggle} tag={'div'}>
                <i className="fa fa-bars" />
            </NavbarToggler>
        </Navbar>
    );
};

export default Footer;
