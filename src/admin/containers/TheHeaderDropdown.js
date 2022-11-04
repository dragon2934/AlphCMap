import CIcon from '@coreui/icons-react';
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
} from '@coreui/react';
import md5 from 'js-md5';
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const TheHeaderDropdown = () => {
    const {user} = useSelector((state) => state.auth);

    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={`https://www.gravatar.com/avatar/${md5(
                            user.email,
                        )}?s=150&d=/assets/img/default-user.png`}
                        className="c-avatar-img"
                        alt={user.email}
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
