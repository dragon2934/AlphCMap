import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actionCreators/authActionCreators';

const Logout = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser()).finally(() => {
            window.location = window.location.origin;
        });
    }, [dispatch, history]);

    return null;
};

export default Logout;
