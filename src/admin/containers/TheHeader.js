import {
    CBreadcrumbRouter,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CSubheader,
    CToggler,
} from '@coreui/react';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setShowSidebar} from '../../redux/actionCreators/adminActionCreators';

// routes config
import routes from '../routes';

import {TheHeaderDropdown} from './index';

const TheHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.admin.sidebarShow);

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow)
            ? false
            : 'responsive';
        dispatch(setShowSidebar(val));
    };

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow)
            ? true
            : 'responsive';
        dispatch(setShowSidebar(val));
    };

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/" />

            <CHeaderNav className="d-md-down-none mr-auto" />

            <CHeaderNav className="px-3">
                <TheHeaderDropdown />
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
            </CSubheader>
        </CHeader>
    );
};

export default TheHeader;
