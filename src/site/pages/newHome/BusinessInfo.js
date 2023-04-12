import { MapMarkerUrls } from '../../../constants';
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getBusinessProfile, saveMerchantConnection, disConnectionMerchant, loadConnectedTotal } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    WeiboShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";
const BusinessInfo = ({ }) => {

    const utilsData = useSelector((state) => state.utilsData);

    const dispatch = useDispatch();
    const property = utilsData.selectedProperty;
    // console.log('. show business info.property.. ' + JSON.stringify(property));
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [totalConnected, setTotalConnected] = useState(null);
    // console.log('. show business info.user.. ' + JSON.stringify(user));
    const getWorkingHourValue = (hours, dayOfWeek, index) => {
        const item = hours.filter((hour) => {
            return parseInt(hour.dayOfWeek) === dayOfWeek;

        });
        // console.log('..item..' + JSON.stringify(item));
        if (item && item.length > 0) {
            if (index === 1) return item[0].openHour;
            if (index === 2) return item[0].closeHour;
            if (index === 3) {
                // console.log('..item[0].closed..' + item[0].closed);
                return item[0].closed;
            }
        }
        return '';
    };
    const [workingHour, setWorkingHour] = useState([]);
    useEffect(() => {
        // setLoading(true);
        dispatch(getBusinessProfile({ id: property.id })).then((resp) => {
            console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);

        }

        );
        const jsonData = {
            id_type: 1,
            id: property.id
        }
        dispatch(loadConnectedTotal(jsonData)).then(resp => {
            console.log('..get total ..' + JSON.stringify(resp));
            setTotalConnected(parseInt(resp.value.value[0].iCount) + parseInt(resp.value.value2[0].iCount));
        }).catch(error => {

        });
        return () => { };
    }, [dispatch, property]);

    const disConnectToMerchant = () => {
        const jsonData = {
            merchant_property_id: property.id
        }
        dispatch(disConnectionMerchant(jsonData)).then(resp => {
            console.log('disconnect ..' + JSON.stringify(resp));
            utilsData.showBusinessInfo = false;
            const fncCallback = utilsData.fncCallback;
            dispatch(cancelShowBusinessInfo());
            if (fncCallback !== null) {
                console.log('..should trigger call back');
                fncCallback();
            }
        }).catch(error => {

        })

    }
    const connectToMerchant = () => {

        //check user whether login
        if (user !== null && user !== undefined) {
            //user already login, just connect them together
            const jsonData = {
                merchant_property_id: property.id
            }
            dispatch(saveMerchantConnection(jsonData)).then(resp => {
                //need redraw the map
                //how to pass redraw map ??
                utilsData.showBusinessInfo = false;
                dispatch(cancelShowBusinessInfo());

                const fncCallback = utilsData.fncCallback;
                if (fncCallback !== null) {
                    console.log('..should trigger call back');
                    fncCallback();
                }
            }).catch(error => {
                console.log('...save connection error');
            })
        } else {
            utilsData.connectToMerchantId = property.id;
            console.log('..start to connect to merchant..' + property.id);
            const blankAddress = {
                "postalCode": "",
                "streetNumber": "",
                "route": "",
                "locality": "",
                "city": "",
                "country": "",
            };
            dispatch(setPropertyRegistrationForm({
                address: blankAddress,
                active: true,
            }));
        }
    }

    const shareUrl = "https://alphcmap.com/business-portal/" + property.id;
    const title = "";
    const domain = localStorage.getItem("current_domain");
    return (
        <Col md={3} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row style={{ width: "100%" }}>

                <Col style={{ textAlign: "left" }}>
                    {
                        companyProfile && (
                            <>

                                <Row>
                                    <Col><h3>{companyProfile.companyName}</h3></Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-address"></i> {property.street_number + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postal_code} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                <Row>   <Col><i className="fa-solid fa-globe"></i> <a href={companyProfile.website} className='business_link'>Company Website</a>  </Col> </Row>
                                {totalConnected ? <Row>   <Col>Connected: {totalConnected} </Col> </Row> : null}
                                <Row>   <Col><i className="fa-solid fa-globe"></i> <a className='business_link' href={shareUrl} target="_blank"> Business Link </a> </Col> </Row>
                                {/* {property.binding_email && property.binding_email !== null && property.binding_email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.binding_email} </Col> </Row> : null} */}
                                <Row>
                                    <Col> <hr /></Col>

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Monday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 0, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 0, 1)} - {getWorkingHourValue(workingHour, 0, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Tuesday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 1, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 1, 1)} - {getWorkingHourValue(workingHour, 1, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Wednesday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 2, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 2, 1)} - {getWorkingHourValue(workingHour, 2, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Thursday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 3, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 3, 1)} - {getWorkingHourValue(workingHour, 3, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Friday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 4, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 4, 1)} - {getWorkingHourValue(workingHour, 4, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Saturday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 5, 3) === true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 5, 1)} - {getWorkingHourValue(workingHour, 5, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Label style={{ textAlign: "right" }} for="lblPropertyName">Sunday:</Label>
                                    </Col>
                                    {getWorkingHourValue(workingHour, 6, 3) == true ?
                                        <>       <Col md={9}>
                                            <Label for="lblPropertyName">We're Closed </Label>
                                        </Col>
                                        </> :
                                        <>
                                            <Col md={9}>
                                                <Label for="lblPropertyName"> {getWorkingHourValue(workingHour, 6, 1)} - {getWorkingHourValue(workingHour, 6, 2)} </Label>
                                            </Col>
                                        </>
                                    }

                                </Row>
                            </>
                        )
                    }

                </Col>
            </Row>


            <Row>
                {
                    user !== undefined && user.property !== undefined && property.id === user.property.id ? null :
                        <Col>

                            {property.connected === "1" ?
                                <Button

                                    color={'success'}
                                    block
                                    onClick={() => disConnectToMerchant()}>
                                    DisConnect
                                </Button> :
                                <Button

                                    color={'success'}
                                    block
                                    onClick={() => connectToMerchant()}>
                                    Connect
                                </Button>
                            }
                        </Col>
                }
                <Col>
                    <Button
                        className="mt-1 mb-5"
                        color={'danger'}
                        block
                        onClick={() => {
                            // const data = {
                            //     email: utilsData.emailForChangeColor,
                            //     color: color
                            // };
                            utilsData.showBusinessInfo = false;
                            dispatch(cancelShowBusinessInfo());
                        }}>
                        Cancel
                    </Button>
                </Col>


            </Row>


            {
                user !== undefined && user.property !== undefined && property.id === user.property.id ?
                    <>
                        <Col  >
                            Share your business <br />
                            {/* <FacebookShareButton url={shareUrl}
                                quote={title}> <FacebookIcon size={32} round /></FacebookShareButton>     <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <LinkedinShareButton url={shareUrl} >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <PinterestShareButton
                                url={String(window.location)}


                            >
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <RedditShareButton
                                url={shareUrl}
                                title={title}
                                windowWidth={660}
                                windowHeight={460}

                            >
                                <RedditIcon size={32} round />
                            </RedditShareButton> */}
                            <EmailShareButton
                                url={shareUrl}
                                subject={title}
                                body="body"

                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                            {/* <LineShareButton
                                url={shareUrl}
                                title={title}

                            >
                                <LineIcon size={32} round />
                            </LineShareButton>
                            <WeiboShareButton
                                url={shareUrl}
                                title={title}


                            >
                                <WeiboIcon size={32} round />
                            </WeiboShareButton> */}
                        </Col>
                    </> : null
            }
        </Col>
    );
};
export default BusinessInfo;