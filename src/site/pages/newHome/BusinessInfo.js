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
import { getBusinessProfile, saveMerchantConnection, disConnectionMerchant, loadConnectedTotal, getHighRiseBusinessInfo, fetchFlyers } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';
import { getLoginType } from '../../../utils/utils';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from '@coreui/react';
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
import QRCode from "react-qr-code";
const PAGE_SIZE = 10;
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// import type { PDFDocumentProxy } from 'pdfjs-dist';
console.log('..pdf js..' + pdfjs.version);
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const BusinessInfo = ({ }) => {

    const utilsData = useSelector((state) => state.utilsData);

    const dispatch = useDispatch();
    const property = utilsData.selectedProperty;
    // console.log('. show business info.property.. ' + JSON.stringify(property));
    const history = useHistory();
    const serverUrl = process.env.REACT_APP_SOCKET_SERVER;
    const loginType = getLoginType();
    const [bindingInfo, setBindingInfo] = useState([])
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [totalConnected, setTotalConnected] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [ isShowHighRise, setIsShowHighRise ] = useState(false);
    // console.log('. show business info.user.. ' + JSON. stringify(user));
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
    const [flyer, setFlyer] = useState(null);

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log('..set page ...' + numPages);
        setNumPages(numPages);
    }
    const onDocumentLoadError = (error) => {
        console.log('...load PDF error..', error)
    }

    const [workingHour, setWorkingHour] = useState([]);
    useEffect(() => {
        setLoading(true);

        let email = property.email;
        email = email.replace(property.unit_no + '-', '')
        console.log('..email is..' + email)
        if (loginType === 1 && property.settlement_type === 'highRise') {
            //This is high Rise , it should load others
            dispatch(getHighRiseBusinessInfo(email)).then(resp => {
                const highRiseInfo = resp.value.data;

                // if(highRiseInfo && highRiseInfo.length > 1){
                setBindingInfo(resp.value.data);
                //     setIsShowHighRise(true);
                // }
                setLoading(false);
            });
        }

        dispatch(getBusinessProfile({ id: property.id })).then((resp) => {
            console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);
            const ownerId = resp.value.companyProfile.users_id.id;
            // console.log('...ownerId...', ownerId);
            dispatch(fetchFlyers(ownerId, { page: 1, pageSize: 1 })).then(resp => {
                console.log('fetch ...flyers..', resp);
                setFlyer(resp.value.data);
            })
            setLoading(false);
        }

        );
        const jsonData = {
            id_type: 1,
            id: property.id
        }
        dispatch(loadConnectedTotal(jsonData)).then(resp => {
            console.log('..get total ..' + JSON.stringify(resp));
            let total1 = parseInt(resp.value.value[0].iCount) + parseInt(resp.value.value2);
            setTotalConnected(total1 > 0 ? total1 : 0);
        }).catch(error => {

        });
        return () => { };
    }, [dispatch, property]);

    const editBusinessProfile = () => {
        history.push('/business-profile?id=' + property.id);
    }
    const onUploadFlyer = () => {
        utilsData.showFlyerUpload = true;
        utilsData.showBusinessInfo = false;
        dispatch(cancelShowBusinessInfo());
    }
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

    const shareUrl = "https://klosertoyou.com/business-portal/" + property.id;
    const title = "";
    const domain = localStorage.getItem("current_domain");
    const cbSendEmail = (e, property) => {
        // const { utilsData } = this.props;
        utilsData.drawFinished = true;
        const data = [];
        data.push({
            properties: property
        });
        utilsData.selectedProperty = data;
        utilsData.showBusinessInfo = false;
        dispatch(cancelShowBusinessInfo());
        // dispatch()

        // this.setState({
        //     selectedProperties: data,
        // });
    }
    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );
    return (

        bindingInfo.length > 1 ?
            <>
                <Col md={6} sm={12} xs={12} className="overlay-form-container">
                    <Link to={'/'}>
                        <img
                            className={'logo-container'}
                            src={'/assets/img/logo-white.png'}
                            alt={'logo'}
                        />
                    </Link>
                    <Row style={{ width: "100%" }}>
                        <Col> {property.email} </Col>
                    </Row>
                    <Row style={{ width: "100%" }}>
                        <Col>
                            <CDataTable
                                items={bindingInfo}
                                loading={loading}
                                fields={[
                                    { key: 'unit_no', _classes: 'font-weight-bold', label: 'Unit #' },
                                    { key: 'companyName', label: 'Company Name' },
                                    'businessPhone',

                                ]}
                                hover
                                striped
                                sorter
                                tableFilter={{ 'placeholder': 'Keywords...' }}
                                itemsPerPage={PAGE_SIZE}
                                pagination
                                clickableRows
                                onRowClick={(item) =>
                                    window.open(`https://klosertoyou.com/business-portal/${item.id}`, "_blank")
                                }
                            /></Col>
                    </Row>
                    <Row>
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
                </Col>
            </> :
            <>
                <Col md={6} sm={12} xs={12} className="overlay-form-container">
                    <QRCode
                        size={256}
                        className={'logo-container'}
                        style={{ marginTop: "20px", height: "100px", maxWidth: "100%", width: "100%" }}
                        value={shareUrl}
                        viewBox={`0 0 256 256`}
                    />

                    <Row style={{ width: "100%" }}>

                        <Col style={{ textAlign: "left" }}>
                            {
                                companyProfile ?
                                    <>

                                        <Row>
                                            <Col><h3>{companyProfile.companyName}</h3></Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-address"></i> {(property.unit_no ? property.unit_no + ' - ' : '') + property.street_number + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postal_code} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-globe"></i> <a href={companyProfile.website.startsWith('http') ? companyProfile.website : 'https://' + companyProfile.website} className='business_link'>Company Website</a>  </Col> </Row>
                                        {totalConnected ? <Row>   <Col>Connected: {totalConnected} </Col> </Row> : null}
                                        <Row>   <Col><i className="fa-solid fa-globe"></i> <a className='business_link' href={shareUrl} target="_blank"> {shareUrl}</a>
                                            {
                                                user !== undefined && user.property !== undefined && property.id === user.property.id ?
                                                    <>

                                                        &nbsp;&nbsp;&nbsp; share: &nbsp;

                                                        <EmailShareButton
                                                            url={shareUrl}
                                                            subject={title}
                                                            body="body"

                                                        >
                                                            <EmailIcon size={32} round />
                                                        </EmailShareButton>


                                                    </> : null
                                            }
                                        </Col> </Row>
                                        {property.email && property.email !== null && property.email !== 'null' ? <Row>
                                            <Col><i className="fa-solid fa-envelope"></i> {property.email + '@' + companyProfile.companyName + '.com'}
                                                {property.connected !== "1" || (user !== undefined && user.property !== undefined && property.id === user.property.id) ? null : <Button size={'sm'} onClick={(e) => cbSendEmail(e, property)} >Send Email</Button>}
                                            </Col>
                                        </Row> : null}
                                        <Row>
                                            <Col>
                                                {companyProfile.android_url ? <a href={companyProfile.android_url} target='_blank' >
                                                    <img
                                                        className={'app-container'}
                                                        src={'/assets/img/google-play-badge.png'}
                                                        alt={'Android App Download'}
                                                    />
                                                </a> : null}
                                            </Col>
                                            <Col>
                                                {companyProfile.ios_url ? <a href={companyProfile.ios_url} target='_blank' >
                                                    <img
                                                        className={'app-container'}
                                                        src={'/assets/img/appstore-badge.png'}
                                                        alt={'iOS App Download'}
                                                    />
                                                </a> : null}
                                            </Col>
                                        </Row>



                                        <Row>
                                            <Col> <hr /></Col>

                                        </Row>
                                        <Row>
                                            <Col>
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
                                            </Col>
                                            <Col>
                                                {flyer && flyer.length > 0 ?
                                                    <>
                                                        <Row>
                                                            <Col> {flyer[0].attributes.description} </Col>
                                                            <Col> <a href={serverUrl + flyer[0].attributes.flyer_files.data[0].attributes.fileUrl} target='_blank'
                                                                style={{ color: "#ff0000", fontWeight: "bold" }}
                                                            > Download Flyer </a></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>

                                                                <div>
                                                                    <Document file={serverUrl + flyer[0].attributes.flyer_files.data[0].attributes.fileUrl}

                                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                                        onLoadError={onDocumentLoadError}
                                                                    >
                                                                        <Page pageNumber={pageNumber} />
                                                                    </Document>

                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{ marginTop: '20px', textAlign: 'center', width: '50%' }}>
                                                                <Row ><Col>
                                                                    <button className='pdfViewer' onClick={goToPrevPage}> {'<'} </button>
                                                                </Col>
                                                                    <Col>
                                                                        <p className='pdfViewer'>
                                                                            Page {pageNumber} of {numPages}
                                                                        </p>
                                                                    </Col>
                                                                    <Col>
                                                                        <button className='pdfViewer' onClick={goToNextPage}> {'>'} </button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </> : ''
                                                }
                                                {parseInt(loginType) === 2 && user !== undefined && user.property !== undefined && property.id === user.property.id ?

                                                    <Col>
                                                        <Button

                                                            color={'success'}
                                                            block
                                                            onClick={() => onUploadFlyer()}>
                                                            Upload Flyer
                                                        </Button>
                                                    </Col>
                                                    : null
                                                }
                                            </Col>


                                        </Row>

                                    </>
                                    : <>
                                        <Row>
                                            {loading ? null : <Col> Login and complete business registration! </Col>}
                                        </Row>

                                    </>
                            }

                        </Col>
                    </Row>


                    <Row style={{ width: "100%", marginTop: "20px" }}>
                        {
                            parseInt(loginType) === 2 && user !== undefined && user.property !== undefined && property.id === user.property.id ?
                                <>

                                    <Col>
                                        <Button

                                            color={'success'}
                                            block
                                            onClick={() => editBusinessProfile()}>
                                            Edit
                                        </Button>

                                    </Col>
                                </>
                                :
                                companyProfile ? <Col>

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
                                </Col> : null
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

                    {/* 
                    {
                        user !== undefined && user.property !== undefined && property.id === user.property.id ?
                            <>
                                <Col  >
                                    Share your business <br />
                                   
                                    <EmailShareButton
                                        url={shareUrl}
                                        subject={title}
                                        body="body"

                                    >
                                        <EmailIcon size={32} round />
                                    </EmailShareButton>
                                  
                                </Col>
                            </> : null
                    } */}
                </Col>
            </>
    );
};
export default BusinessInfo;