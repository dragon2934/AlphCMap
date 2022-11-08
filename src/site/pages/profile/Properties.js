import React, {useEffect, useState,useCallback} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spinner,
    Table,
} from 'reactstrap';
import { fetchUserProperties,deleteUserAdditionalAddress,getReceiptInfo} from '../../../redux/actionCreators/appActionCreators';
import { isAppEmbedWebview } from '../../../utils/utils';
import {toastr} from 'react-redux-toastr';
import { useHistory } from 'react-router';
 

const UserProperties = () => {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.auth.user);
    const [receiptInfo,setReceiptInfo] = useState([]);
    
    if(currentUser === null || currentUser === undefined){
        //back to login
        history.push('/login');
    }
    let receipt = 'null';

    const query = new URLSearchParams(window.location.search);

    if(query!=null && query!==undefined){
       receipt = query.get('receipt');
    }
    
    const [totalPropertyCount,setTotalPropertyCount] = useState(0);
    useEffect(() => {
        dispatch(fetchUserProperties(currentUser.id)).then(({value: properties}) => {
            // console.log('user properties:' + JSON.stringify(properties));
            setProperties(properties);
            // console.log('total property =' + properties.length);
            setTotalPropertyCount(properties.length);
            //get receipt
            dispatch(getReceiptInfo()).then(({value: receipt}) => {
                console.log('receipt...' + JSON.stringify(receipt));
                setReceiptInfo(receipt);
                setLoading(false);
            });
            
        }).catch(error =>{
            console.log('error in fetch....' + JSON.stringify (error));
            toastr.error(error.error,error.description);
            setLoading(false);
        });
    }, [dispatch]);

    const isUserPaid=()=>{
        return true;
        // const whiteList =[
        //     '164756803881',
        //     '992939330622',
        //     '919821057521'
        // ];
        // if(whiteList.includes( receiptInfo.mobileNumber)) return true;
        // if(receiptInfo.platform === 'ios') return true; //Free right now
        // if(receiptInfo.iapRecipt === null || receiptInfo.iapRecipt === undefined) return false;
        // if(receiptInfo.iapRecipt!=='null') return true;

        // return false;
    }


    // const onDeleteProperty= useCallback(() =>{
    //     toastr.confirm(
    //         'Are you sure to delete this property? This action is irreversible!',
    //         {
    //             onOk: () => {
    //                 dispatch(deleteUserAdditionalAddress()).then(() => {
    //                     window.location.reload();
    //                 });
    //             },
    //         },
    //     );
    // },[dispatch,history]);

    return (
        <Card id='propertiesList'>
            <CardHeader></CardHeader>
            <CardBody style={{padding: "0.5em !important"}}>
                {loading ? (
                    <div className="text-center">
                        <Spinner size={'sm'} />
                    </div>
                ) :  isAppEmbedWebview() ? (
                    
                     <Table striped>
                        {/* <thead>
                            <tr>
                                <th>Address</th>
                                <th >Actions</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {properties.map((userProperty) => (
                                <>
                                    <tr>
                                        <td>
                                            <b>{ currentUser.property!=null && currentUser.property!=undefined && userProperty.id === currentUser.property.id ?'Main Registered  Address ' + ( userProperty.totalOccupants!=null && userProperty.totalOccupants!=undefined? '(' +userProperty.totalOccupants+')':'' ):  userProperty.primaryHolder?'Primary Address ' + '(' +userProperty.totalOccupants+')':'Secondary Address'} </b> <br/>
                                       { userProperty.unitNo!=null && userProperty.unitNo!=undefined && userProperty.unitNo.length >0 ? userProperty.unitNo + ' - ':''}  {userProperty.streetNumber} {userProperty.route} {userProperty.locality} <br/> {userProperty.postalCode}
                                        <br />
                                        <hr />
                                      

                                        <Button
                                                tag={Link}
                                                color={'primary'}
                                                to={`/mobile-user-property/edit/${userProperty.id}`}>
                                              { userProperty.primaryHolder? 'View / Edit':'View'}
                                            </Button>

                                            <Button style={{margin:"0 5px"}}
                                                tag={Link}
                                                color={'primary'}
                                                to={`/mobile-residents/${userProperty.id}`}>
                                                Residents
                                            </Button>

                                     { currentUser.property!=null && currentUser.property!=undefined && userProperty.id === currentUser.property.id?null:       <Button
                                                 
                                                color={'danger'}
                                                onClick={() =>{
                                                    
                                                        toastr.confirm(
                                                            'Are you sure you want to delete this property? This action is irreversible!',
                                                            {
                                                                onOk: () => {
                                                                    dispatch(deleteUserAdditionalAddress(userProperty.userPropertyId,userProperty.id)).then(({value:retValue}) => {
                                                                        console.log("retValue.." + retValue);
                                                                        if(retValue.status==='failed'){
                                                                            toastr.error("Error!",retValue.reason);
                                                                        }else{
                                                                            window.location.reload();
                                                                        }
                                                                        
                                                                    });
                                                                },
                                                            },
                                                        );
                                                    
                                                }
                                                    } >
                                                Delete
                                            </Button> }

                                        </td>
                                        <td>
                                       
                                        </td>
                                         
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </Table> 
                    ) :  (
                         <Table striped>
                        <thead>
                            <tr>
                                <th>Primary</th>
                                <th>Address</th>
                                <th>Street Name</th>
                                <th>City</th>
                                <th>Post Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((userProperty) => (
                                <>
                                    <tr>
                                        <td> <b>{ currentUser.property !== null && currentUser.property !==undefined && userProperty.id === currentUser.property.id ?'Main Registered  Address': userProperty.primaryHolder?'Primary':'Secondary'} </b></td>
                                        <td>{userProperty.streetNumber}</td>
                                        <td>{userProperty.route}</td>
                                        <td>{userProperty.locality}</td>
                                        <td>{userProperty.postalCode}</td>
                                        <td>
                                             <Button
                                                tag={Link}
                                                color={'primary'}
                                                to={`/profile/user-property/edit/${userProperty.id}`}>
                                                { userProperty.primaryHolder? 'View / Edit':'View'}
                                            </Button>
                                         
                                        </td>
                                        <td>
                                        <Button style={{margin:"0 15px"}}
                                            tag={Link}
                                            color={'primary'}
                                            to={`/profile/residents/${userProperty.id}`}>
                                            Residents { userProperty.primaryHolder ? '(' +userProperty.totalOccupants+')':'' }
                                        </Button>
                                        </td>
                                                       
                                        <td>
                                        { currentUser.property!=null && currentUser.property!=undefined && userProperty.id === currentUser.property.id?null: <Button
                                                 
                                                color={'danger'}
                                                onClick={() =>{
                                                    
                                                        toastr.confirm(
                                                            'Are you sure you want to delete this property? This action is irreversible!',
                                                            {
                                                                onOk: () => {
                                                                    dispatch(deleteUserAdditionalAddress(userProperty.userPropertyId,userProperty.id)).then(({value:retValue}) => {
                                                                        console.log("retValue.." + JSON.stringify( retValue));
                                                                        if(retValue.status==='failed'){
                                                                            toastr.error("Error!",retValue.reason);
                                                                        }else{
                                                                             window.location.reload();
                                                                        }
                                                                    });
                                                                },
                                                            },
                                                        );
                                                    
                                                }
                                                    } >
                                                Delete
                                            </Button>}
                                            </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </Table>
                              )
                     



                }
            </CardBody>
            <CardFooter>
             { totalPropertyCount <= 77777777 ?  isAppEmbedWebview() ?  <Button
                    block
                    tag={Link}
                    color={'success'}
                    onClick={()=>{
                        if(isUserPaid()){
                          history.push(`/create-properties`);
                        }else{
                          toastr.error('Error','Please subscribe, only $9.99/Year!');
                          try {
                            window.ReactNativeWebView.postMessage(
                                JSON.stringify({action: 'goSubscribe'}),
                            );
                           } catch (e) {}

                          }
                      }
                    }>
                    New Property
                </Button> :     <Button
                    block
                    tag={Link}
                    color={'success'}
                    onClick={()=>{
                          if(isUserPaid()){
                            history.push(`/create-properties`);
                          }else{
                            history.push(`/app-introduction`);
                            toastr.error('Error','Please download App and subscribe, only $9.99/Year!');

                          }
                      }
                    }>
                    
                    New Property
                </Button>
            : null }

            {isAppEmbedWebview() ? 
            <Button
            block
            tag={Link}
            color={'success'}
            to={`/mobile-view-all-properties-at-map`}>
            Map View
        </Button>
            :
            <Button
            block
            tag={Link}
            color={'success'}
            to={`/profile/view-all-properties`}>
            Map View
        </Button>
        }
            </CardFooter>
        </Card>
    );
};

export default UserProperties;
