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
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '../../redux/actionCreators/adminActionCreators';

// sidebar nav config
// import navigation from './_nav';
const TheSidebar = () => {
    const dispatch = useDispatch();
    const navigation = [
        {
            _tag: 'CSidebarNavTitle',
            _children: ['Data'],
        },
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
        {
            _tag: 'CSidebarNavTitle',
            _children: ['Campaigns'],
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Email Campaigns',
            to: '/admin/email-campaigns',
            icon: 'cil-home',
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Templates',
            to: '/admin/templates',
            icon: 'cil-home',
        },
        {
            _tag: 'CSidebarNavTitle',
            _children: ['Marketing'],
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Coupons',
            to: '/admin/coupons',
            icon: 'cil-user',
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Flyer',
            to: '/admin/flyers',
            icon: 'cil-user',
        },
        {
            _tag: 'CSidebarNavItem',
            name: 'Promting Events',
            to: '/admin/events',
            icon: 'cil-user',
        },
    ];
    const show = useSelector((state) => state.admin.sidebarShow);
    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch(setShowSidebar(val))}>
            <CSidebarBrand className="d-md-down-none" to="/">
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
