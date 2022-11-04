import CIcon from '@coreui/icons-react';
import {
    CCreateElement,
    CImg,
    CSidebar,
    CSidebarBrand,
    CSidebarMinimizer,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CSidebarNavTitle,
} from '@coreui/react';
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setShowSidebar} from '../../redux/actionCreators/adminActionCreators';

// sidebar nav config
// import navigation from './_nav';
const TheSidebar = () => {
    const dispatch = useDispatch();
    const navigation = [
        {
            _tag: 'CSidebarNavItem',
            name: 'Users',
            to: '/admin/users',
            icon: 'cil-user',
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Properties',
            to: '/admin/properties',
            icon: 'cil-home',
        },
    ];
    const show = useSelector((state) => state.admin.sidebarShow);
    // const user = useSelector((state) => state.auth.user);
    // const checkUseLevel = (roleName) =>{
    //     if(roleName === process.env.REACT_APP_ROLE_ADMIN_NAME) return 1;
    //     if(roleName === process.env.REACT_APP_ROLE_PM_NAME) return 1;
    //     return 3;
    // }
    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch(setShowSidebar(val))}>
            <CSidebarBrand className="d-md-down-none" to="/admin">
                <CImg
                    className="c-sidebar-brand-full"
                    src={'/assets/img/logo-sm.png'}
                    height={35}
                />
                <CImg
                    className="c-sidebar-brand-minimized"
                    src={'/assets/img/icon-white-small.png'}
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>
                <li className="c-sidebar-nav-item">
                    <a
                        aria-current="page"
                        className="c-sidebar-nav-link"
                        href="/">
                        <CIcon className="c-sidebar-nav-icon" name="cil-home" />
                        Front Page
                    </a>
                </li>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
};

export default React.memo(TheSidebar);
