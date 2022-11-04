import React, {useEffect,} from 'react';
import {
    Spinner,
} from 'reactstrap';
// import {store} from '../../../redux/store';
// import {SET_AUTH} from '../../../redux/actionTypes';
import { useSelector} from 'react-redux';
// import { useHistory ,useLocation } from 'react-router-dom';

const MobileLoading = () => {
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
            document.querySelector('#loadingContainer').style.marginTop = '40%';
        } catch (e) {}
    });
    const formatUrl=(url)=>{
        let retUrl  = url;
        retUrl = retUrl.replace('%2f','/');
        retUrl = retUrl.replace('%2e','=');
        retUrl = retUrl.replace('%2d','?');
        return retUrl;
    }
    const currentUser = useSelector((state) => state.auth.user);
    // const location = window.location;
    // console.log('xxxx current location' + JSON.stringify(location));
    if(currentUser!=null && currentUser!=undefined){
        //redirect to
        const query = new URLSearchParams(window.location.search);

        if(query!=null && query!==undefined){
            let redirectUrl = window.location.origin+'/'+ query.get('redirect');
            // console.log(' xxxx=' + redirectUrl);
             window.location.href=  redirectUrl;
        }
    }

    setTimeout(function(){
            //redirect to
        const query = new URLSearchParams(window.location.search);
        console.log('query ...' + query);

        if(query!=null && query!==undefined){
            let redirectUrl = window.location.origin+'/'+  query.get('redirect');
            // console.log(' xxxx=' + redirectUrl);
             window.location.href=  redirectUrl;
        }
        
        
    },500);
    return (
        <div className="content">
            <div className="text-center" id='loadingContainer'>
                        <Spinner size={'lg'} />
            </div>
        </div>
    );
};

export default MobileLoading;
