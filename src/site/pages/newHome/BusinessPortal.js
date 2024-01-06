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
import { getBusinessProfile, saveMerchantConnection, disConnectionMerchant, fetchFlyers } from '../../../redux/actionCreators/adminActionCreators';
import { changePropertyColor, cancelShowBusinessInfo } from '../../../redux/actionCreators/appActionCreators';
import { useHistory } from 'react-router';
import { setPropertyRegistrationForm } from '../../../redux/actionCreators/registrationActionCreators';
import QRCode from "react-qr-code";
import { SERVICE_URL } from '../../../constants';
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


const BusinessPortal = ({ match }) => {

    // console.log('..match..' + JSON.stringify(match));
    const propertyId = match.params.id;
    const utilsData = useSelector((state) => state.utilsData);
    const history = useHistory();
    const shareUrl = "https://klosertoyou.com/business-portal/" + propertyId;
    const serverUrl = process.env.REACT_APP_SOCKET_SERVER;// SERVICE_URL.replace('/api', '');
    const dispatch = useDispatch();
    // const property = utilsData.selectedProperty;
    // console.log('..property.. ' + JSON.stringify(property));
    const user = useSelector((state) => state.auth.me);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
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
        dispatch(getBusinessProfile({ id: propertyId })).then((resp) => {
            // console.log('..property ..info..' + JSON.stringify(resp.value));
            setCompanyProfile(resp.value.companyProfile);
            setWorkingHour(resp.value.workingHour);
            setProperty(resp.value.property);

            const ownerId = resp.value.companyProfile.users_id.id;
            console.log('...ownerId...', ownerId);
            dispatch(fetchFlyers(ownerId, { page: 1, pageSize: 1 })).then(resp => {
                console.log('fetch ...flyers..', resp);
                setFlyer(resp.value.data);
            });

            setLoading(false);

        }

        );

        return () => { };
    }, [dispatch]);

    const disConnectToMerchant = () => {
        const jsonData = {
            merchant_property_id: property.id
        }
        dispatch(disConnectionMerchant(jsonData)).then(resp => {
            console.log('disconnect ..' + JSON.stringify(resp));
            utilsData.showBusinessInfo = false;
            const fncCallback = utilsData.fncCallback;
            dispatch(cancelShowBusinessInfo()).then(resp => {
                history.push('/');
            });

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
                history.push('/');
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
            })).then(resp => {
                history.push('/');
            });
        }
    }
    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );
    return !loading && (
        <Col md={12} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

            <Row style={{ width: "100%" }}>
                <Col xl='6' style={{ textAlign: "left", width: "100%" }}>
                    <Row >

                        <Col style={{ textAlign: "left" }}>
                            {
                                companyProfile && (
                                    <>

                                        <Row>
                                            <Col><h1>{companyProfile.companyName}</h1></Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-address"></i> {property.streetNumber + ' ' + property.route + ' ' + property.locality + ',' + property.city + ',' + property.postalCode} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-phone"></i> {companyProfile.phone} </Col> </Row>
                                        <Row>   <Col><i className="fa-solid fa-globe"></i> <a href={companyProfile.website} target="_blank" className='business_link'>Company Website</a> </Col> </Row>
                                        {/* {property.binding_email && property.binding_email !== null && property.binding_email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.binding_email} </Col> </Row> : null} */}
                                        {property.email && property.email !== null && property.email !== 'null' ? <Row>   <Col><i className="fa-solid fa-envelope"></i> {property.email + '@' + companyProfile.companyName + '.com'} </Col> </Row> : null}
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
                                            <Col md={3}>
                                                Monday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 0, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 0, 1)} - {getWorkingHourValue(workingHour, 0, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Tuesday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 1, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 1, 1)} - {getWorkingHourValue(workingHour, 1, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Wednesday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 2, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 2, 1)} - {getWorkingHourValue(workingHour, 2, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Thursday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 3, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 3, 1)} - {getWorkingHourValue(workingHour, 3, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Friday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 4, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 4, 1)} - {getWorkingHourValue(workingHour, 4, 2)}
                                                    </Col>
                                                </>
                                            }


                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Saturday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 5, 3) === true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 5, 1)} - {getWorkingHourValue(workingHour, 5, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                Sunday:
                                            </Col>
                                            {getWorkingHourValue(workingHour, 6, 3) == true ?
                                                <>       <Col md={6}>
                                                    We're Closed
                                                </Col>
                                                </> :
                                                <>
                                                    <Col md={6}>
                                                        {getWorkingHourValue(workingHour, 6, 1)} - {getWorkingHourValue(workingHour, 6, 2)}
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                    </>
                                )
                            }

                        </Col>
                        <Col md='4'>
                            <div className='qrCodeBg'>
                                <QRCode
                                    size={256}
                                    className={'logo-container'}
                                    style={{ marginTop: "20px", height: "150px", maxWidth: "100%", width: "100%" }}
                                    value={shareUrl}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row xl={6}>
                        <Col>

                            {property.connected === "1" ?
                                <Button
                                    className="mt-1 mb-5"
                                    color={'success'}
                                    block
                                    onClick={() => disConnectToMerchant()}>
                                    DisConnect
                                </Button> :
                                <Button
                                    className="mt-1 mb-5"
                                    color={'success'}
                                    block
                                    onClick={() => connectToMerchant()}>
                                    Connect
                                </Button>
                            }
                        </Col>

                    </Row>
                </Col>
                <Col xl='6'>

                    {flyer && flyer.length > 0 ?
                        <>
                            <Row>
                                <Col> Flyers: {flyer[0].attributes.description} <br />Published At: {flyer[0].attributes.updatedAt.split('T')[0]}</Col>
                                <Col> <a href={serverUrl + flyer[0].attributes.flyer_files.data[0].attributes.fileUrl} target='_blank'> View At Full Size </a></Col>
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
                        </> : 'No Flyer'
                    }
                </Col>

            </Row>

        </Col>
    );
};
export default BusinessPortal;