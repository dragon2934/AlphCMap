import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actionCreators/authActionCreators';
import { toastr } from 'react-redux-toastr';
const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser()).finally(() => {
            localStorage.removeItem("current_domain");
            const showLoginTips = localStorage.getItem('show_login_tips');
            if (showLoginTips && parseInt(showLoginTips) === 2) {
            } else {
                localStorage.setItem("show_login_tips", 1);
            }
            // setTimeout(() => {
            window.location = window.location.origin;
            // }, 2000);

        });
    }, [dispatch, history]);

    return null;
};

export default Logout;
