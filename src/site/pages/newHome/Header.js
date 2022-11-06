import React, {useState, useCallback} from "react";
import {useSelector} from 'react-redux';
import {NavLink as ReactRouterLink} from "react-router-dom";
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



const Header = () => {
    const user = useSelector((state) => state.auth.user);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const collapse = () => setIsOpen(false);
    const [dropDownOpen,setDropDownOpen] = useState(false);
    
    

    // const switchButtonActive=(type)=>{
    //     setSearchType(type);
    // }

    let userName = '';
    let userEmail = '';

    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
    } catch (e) {}


    if(user!=null){
        // console.log('role =' + user.role.name);
        if(user.companyName){
            userEmail = user.property.email + '@' + user.companyName + '.com';
            localStorage.setItem("current_domain", user.companyName + '.com');
        }else if(user.lastName){
            userEmail = user.property.email + '@' + user.lastName + '.com';
            localStorage.setItem("current_domain", user.lastName + '.com');
        }
        
    }
    const toggleDropDownMenu=useCallback(() => {
        setDropDownOpen(!dropDownOpen)
    });
    const adminGroup = [process.env.REACT_APP_ROLE_ADMIN_NAME,process.env.REACT_APP_ROLE_PM_NAME];
    const menuLinks =[
        {menuText:'Change Address',menuID:1},
        {menuText:'Change Email',menuID:2},
        {menuText:'Change Mobie',menuID:3},
        {menuText:'Delete Account',menuID:4},
        {menuText:'logout',menuID:5},

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
                <div style={{marginLeft:"20px"}}> { userEmail } </div>
                <Nav className="ml-auto" navbar>
                <NavItem>
                        <NavLink
                            tag={ReactRouterLink}
                            onClick={collapse}
                            to="/about-us">
                            About AlphCMap
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
                    {user ? (
                        <>

                         <ButtonDropdown >
            <Dropdown isOpen={dropDownOpen} toggle={toggleDropDownMenu} >
                <DropdownToggle color="primary" caret className="dropdown-toggle">
                   Menu
                </DropdownToggle>
                <DropdownMenu className="city-dropdown">
                     {
                        menuLinks.map(menu=>{
    return <DropdownItem key={'key'+menu.menuID} onClick={() =>{
    // setSelectedCity(city.full_name);
    console.log('selected menu..'  + menu.menuID);
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
