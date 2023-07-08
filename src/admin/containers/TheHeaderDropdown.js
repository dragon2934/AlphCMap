import CIcon from '@coreui/icons-react';
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
} from '@coreui/react';
import React from "react";
// import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const TheHeaderDropdown = () => {

    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={`/assets/img/default-user.png`}
                        className="c-avatar-img"
                        style={{ backgroundColor: "black" }}
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem tag={Link} to={'/logout'}>
                    <CIcon name="cil-lock-locked" className="mfe-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheHeaderDropdown;
