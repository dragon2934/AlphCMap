import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CForm,
    CFormGroup,
    CInput,
    CInvalidFeedback,
    CLabel,
    CRow,
    CSpinner,
    CTabs,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink,
    CSwitch,
} from '@coreui/react';
import {useFormik} from 'formik';
import mapboxgl from 'mapbox-gl';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {Col, FormGroup, Input, Label} from 'reactstrap';
import AntdSelect from '../../../common/components/AntdSelect';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {propertySchema} from '../../../common/validation/propertySchema';
import {
    fetchProperty,
    saveProperty,
    searchUsers,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    generateEmail,
    geocodeAddress,
    reverseGeocodePoint,
} from '../../../utils/propertyUtils';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {useSelector} from 'react-redux';
import PropertyTenants from './PropertyTenants';
import utilsTools from "../../../utils/utils";

const PropertyEdit = ({match}) => {
    const [searchText, setSearchText] = useState('');
    const [totalFloors, setTotalFloors] = useState( 15);
    const [totalUnitsEachFloor,setTotalUnitsEachFloor] = useState(10);
    const [unitInfoReady,setUnitInfoReady] = useState(false);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [greyData,setGreyData] = useState([]);
    const [greying,setGreying] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.auth.user);

    const {map} = useContext(MapContext);

    const [marker] = useState(
        new mapboxgl.Marker({
            draggable: true,
            color: 'blue',
        }),
    );

    const formik = useFormik({
        initialValues: {
            id: match.params.id,
            email: '',
            rural: false,
            primaryAddress: true,
            hightRiseOrCommercial:false,
            totalFloors:'1',
            totalUnitsEachFloor:'1',
            addressType: '',
            settlementType: '',
            unitNo: '',
            postalCode: '',
            streetNumber: '',
            route: '',
            locality: '',
            lotNo: '',
            plotNo: '',
            region: '',
            province: '',
            city: '',
            country: '',
            location: {},
            users: [],
        },
        validationSchema: propertySchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);

            if (values.settlementType === 'lowRise') {
                values.unitNo = '';
            }

            const property = {
                ...values,
                roomJSON:JSON.stringify(tableData),
                totalFloors:totalFloors.toString(),
                totalUnitsEachFloor:totalUnitsEachFloor.toString(),
                greyJSON: JSON.stringify(greyData),
                tenant: user.tenant
            };
            console.log('save property=' + JSON.stringify(property));

            dispatch(saveProperty(property)).then(() => {
                if (match.params.id)
                    history.push(`/admin/properties/${match.params.id}`);
                else history.push('/admin/properties');
            });
        },
    });

    const {
        handleChange,
        handleBlur: handleBlurOrig,
        handleSubmit,
        errors,
        touched,
        values,
        isValid,
        isSubmitting,
        resetForm,
        setValues,
        setFieldValue,
        setFieldTouched,
    } = formik;

    const handleBlur = (...params) => {
        setValues({
            ...values,
            email: generateEmail(values),
        });
        handleBlurOrig(...params);
    };

    const changeMarkerPosition = useCallback(
        (longitude, latitude) => {
            marker.setLngLat([longitude, latitude]);

            reverseGeocodePoint({latitude, longitude}).then((data) => {
                Object.keys(data).forEach((i) => {
                    if (data[i] === undefined) data[i] = '';
                });

                setValues({
                    ...values,
                    ...data,
                    unitNo: values.unitNo,
                    rural: Object.values(data).some((value) => !value),
                    email: generateEmail({
                        ...data,
                        unitNo: values.unitNo,
                    }),
                    location: {
                        latitude,
                        longitude,
                    },
                });
            });
        },
        [marker, setValues, values],
    );
    // PropertyEdit.renderEditable = PropertyEdit.renderEditable.bind(PropertyEdit);
    const renderEditable =(cellInfo) =>{
        // console.log('grey . '+greying+' ....index=' + cellInfo.index +' data=' + greyData[cellInfo.index]);
        const data = tableData;
        if( greying===0){
            return (
                <div
                  style={{ backgroundColor: "#fafafa" }}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => {
                    
                  //   console.log('e...'+JSON.stringify(e));
                     data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                     setTableData(data);
                     console.log(JSON.stringify(data));
                  //   this.setState({ data });
                  }}
                  dangerouslySetInnerHTML={{
                      __html: getCellDataInTable(cellInfo.index,cellInfo.column.id)
                  }}
                />
            );
        } else{
            return greyData[cellInfo.index]==1? data[cellInfo.index][cellInfo.column.id] : (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                    
                    //   console.log('e...'+JSON.stringify(e));
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    setTableData(data);
                    console.log(JSON.stringify(data));
                    //   this.setState({ data });
                    }}
                    dangerouslySetInnerHTML={{
                        __html: getCellDataInTable(cellInfo.index,cellInfo.column.id)
                    }}
                />
                );
        }
    };   
    

    const getCellDataInTable = (floor,unitNo) =>{
        let floorData = tableData;
        let selectedFloor = floorData[floor];
        let data = selectedFloor[unitNo];
        return data;
    }

    const hanldGreyOutClick =(cell) =>{
        let data = greyData;
        console.log('hanldGreyOutClick= .... totalFloors='+ totalFloors+' .......' + cell.target.id +' data=' + data[ totalFloors - parseInt( cell.target.id)  ]);

        if(data[ totalFloors - parseInt( cell.target.id)  ] === 0){
            console.log('should grey....');
            data[ totalFloors - parseInt( cell.target.id)  ] = 1;
            setGreyData(data);
            setGreying(totalFloors - parseInt( cell.target.id)+1);
        }else{
            console.log('should reset !!!....');
            data[ totalFloors - parseInt( cell.target.id)  ] = 0;
            setGreyData(data);
            setGreying(totalFloors - parseInt( cell.target.id));
        }

        // console.log('Grey data=' +JSON.stringify(greyData));
        // const cellData = tableData;
        // //   console.log('e...'+JSON.stringify(e));
        // //   data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        // setTableData(cellData);
    }

    useEffect(() => {
        if (match.params.id)
            dispatch(fetchProperty(match.params.id)).then(
                ({value: property}) => {
                    delete property.property_alert;

                    setValues({
                        ...property,
                        ...property.location,
                        users: property.users.map((u) => u.id),
                    });

                    setUsers(property.users);
                    //set units information
                    ///////////////////
                    // console.log(' property=' + JSON.stringify(property));

                    setTotalFloors(property.totalFloors);
                    setTotalUnitsEachFloor(property.totalUnitsEachFloor);
                    let roomJSON =  property.roomJSON;
                    // console.log('room json=' + roomJSON);
                    if(roomJSON!=null && roomJSON!=undefined){
                        setTableData(JSON.parse(roomJSON));
                        let greyJSON = property.greyJSON;
                        if(greyJSON!=null && greyJSON !=undefined){
                            setGreyData(JSON.parse(greyJSON));
                        }
                        setGreying(1);
                        setUnitInfoReady(true);
                    }else{
                        // build the table ??
                        console.log('1=' + totalFloors + ' 2=' + property.totalFloors );
                        let data = utilsTools.makeData(property.totalFloors,property.totalUnitsEachFloor);
                        //create grey out array
                        // let floorData = matrix(totalFloors,totalUnitsEachFloor,0);
                        const floorData = [];
                        for (let i = 0; i < property.totalFloors; i++) {
                            floorData.push(i);
                            floorData[i]=0;
                        }
                        setGreyData(floorData);
                        // console.log('table data='+JSON.stringify(floorData));
                        setTableData(data);
                        setUnitInfoReady(true);
                    }
                    
                    /////////////////
                    const {latitude, longitude} = property.location;

                    if (longitude && latitude && map) {
                        marker.setLngLat([longitude, latitude]);
                        map.setCenter([longitude, latitude]);
                        marker.addTo(map);
                    }
                },
            );
    }, [dispatch, map, marker, match.params.id, setValues]);

    useEffect(() => {
        if (map) {
            const onClickMap = (e) => {
                const {lng: longitude, lat: latitude} = e.lngLat;
                changeMarkerPosition(longitude, latitude);
                marker.addTo(map);
            };

            map.on('click', onClickMap);

            const onDragMarker = (e) => {
                const {lng: longitude, lat: latitude} = e.target.getLngLat();
                changeMarkerPosition(longitude, latitude);
            };

            marker.on('dragend', onDragMarker);

            return () => {
                map.off('click', onClickMap);
                marker.off('dragend', onDragMarker);
            };
        }
    }, [changeMarkerPosition, map, marker, setValues, values]);

    const onSubmitSearchText = useCallback(
        (e) => {
            e.preventDefault();

            if (!searchText.trim()) return;

            geocodeAddress({
                address: searchText,
            }).then((data) => {
                changeMarkerPosition(data.longitude, data.latitude);
                map.flyTo({
                    center: [data.longitude, data.latitude],
                });
            });
        },
        [changeMarkerPosition, map, searchText],
    );
    const onSubmitBuildRoomNumber = useCallback(
        (e) => {
            e.preventDefault();
            console.log(' total floor=' + totalFloors +' totalUnitsEachFloor=' + totalUnitsEachFloor);
            //build table
            let data = utilsTools.makeData(totalFloors,totalUnitsEachFloor);
            //create grey out array
            // let floorData = matrix(totalFloors,totalUnitsEachFloor,0);
            const floorData = [];
            for (let i = 0; i < totalFloors; i++) {
                floorData.push(i);
                floorData[i]=0;
            }
            setGreyData(floorData);
            console.log('table data='+JSON.stringify(floorData));
            setTableData(data);
            setUnitInfoReady(true);
        }
    );
    
    const onSearchUsers = useCallback(
        (value) => {
            setUsers([]);
            setLoadingUsers(true);
            if (value.length > 2)
                dispatch(searchUsers(value))
                    .then(({value: users}) => {
                        setUsers(users);
                    })
                    .finally(() => setLoadingUsers(false));
            else setUsers(users.filter((u) => values.users.includes(u.id)));
        },
        [dispatch, users, values.users],
    );

    // const range = len => {
    //     const arr = [];
    //     for (let i = len; i >= 1; i--) {
    //       arr.push(i);
    //     }
    //     // console.log('Array=' + JSON.stringify(arr));
    //     return arr;
    // };

    // const newRoomNumber=(floor) =>{
    //     let roomNumber = '';
    //     let roomJSONString = "{";
    //     for(var unit=0;unit <= totalUnitsEachFloor;unit++){
    //         if(unit==0){
    //         }else if(unit>0 && unit<10){
    //             roomNumber = floor.toString() + '0'+ unit.toString();
    //         }else{
    //             roomNumber = floor.toString() + unit.toString();
    //         }
    //         if(unit==0){
    //             roomJSONString = roomJSONString + '"Floor":"'+floor+'",';
    //         }else{
    //             roomJSONString = roomJSONString + '"Unit'+unit+'":"'+roomNumber+'",';
    //         }
            
    //     }
    //     roomJSONString = roomJSONString.substring(0,roomJSONString.length-1);
    //     roomJSONString = roomJSONString + "}";
    //     // console.log('newRoomNumber:' + roomJSONString);
    //     //array to json
    //     // console.log(' roomNumber=' + roomNumber + ' floor=' + floor + ' unit=' + unit);
    //     return JSON.parse(roomJSONString);
    // };
    // const makeData=(floosTotal) =>{
    //     let tableData = range(floosTotal).map(f => {
    //       return {
    //         ...newRoomNumber(f),
    //       };
    //     });
    //     // console.log('makeData:' + JSON.stringify(tableData));
    //     return tableData;
    // };
    const makeTableColumns=(unitsPerFloor) =>{
        let columns =[];
        let lblFloor =
        {
            width: 60,
            Header: "Floor",
            accessor: "Floor",
            Cell: ({ original }) => (
                original.Floor
              ),
        }
        columns.push(lblFloor);
        for(var i=1; i<= unitsPerFloor;i++){
            let header = {
                Header: "Unit-" + i,
                accessor: "Unit" + i,
                Cell:renderEditable,
                // Cell: ({ original }) => (
                //     original!=null && original!=undefined? greyData[totalFloors - parseInt( original.Floor) ] == 1 ?greyOutCell: renderEditable:renderEditable
                // ),
                // getProps: (state, rowInfo) => ({
                //     style: {
                //       backgroundColor: ( rowInfo.original!=null && rowInfo.original!=undefined? greyData[totalFloors - parseInt( rowInfo.original.Floor) ] == 1 ? 'red' : null : null)
                //     }
                // }), 
              };
            columns.push(header);
        }
        //add extra button
        let btnColumn =
        {
            width: 60,
            Header: "Grey Out",
            accessor: "GreyOut",
            Cell: ({ original }) => (
                <button id={original.Floor} className='btnGreyOut' value={original.Floor} onClick={hanldGreyOutClick}>
                  { greyData[totalFloors - original.Floor] === 1 ? '✓' :'X' } 
                </button>
              ),
        }
        columns.push(btnColumn);
        // console.log('make column complete......');
        return columns;
    }
    return (
        

     <CTabs activeTab="home"
     onActiveTabChange={(idx) => setActiveTab(idx)}>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="home">
          {match.params.id
                                ? `Record id: ${match.params.id}`
                                : 'New Property'}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="profile">
           Property Units
          </CNavLink>
        </CNavItem>
        {
            match.params.id?
            <CNavItem>
            <CNavLink data-tab="tenants">
            Tenants Unit
            </CNavLink>
          </CNavItem>:null
        }
      </CNav>
      <CTabContent>
        <CTabPane data-tab="home"  >
        <CRow active={activeTab === 0}>
            <CCol md={6}>
                <CForm onSubmit={handleSubmit}>
                    <CCard>
                        {/* <CCardHeader>
                            {match.params.id
                                ? `Record id: ${match.params.id}`
                                : 'New Property'}
                        </CCardHeader> */}
                        <CCardBody>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="firstName">Email</CLabel>
                                    <CInput
                                        id="email"
                                        name="email"
                                        disabled={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        invalid={touched.email && errors.email}
                                    />
                                    <CInvalidFeedback>
                                        {errors.email}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <FormGroup tag="fieldset">
                                    <Label for="postalCode">Address Type</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="addressType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'residential'}
                                                checked={
                                                    values.addressType ===
                                                    'residential'
                                                }
                                                invalid={
                                                    touched.addressType &&
                                                    errors.addressType
                                                }
                                            />
                                            Residential
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="addressType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'commercial'}
                                                checked={
                                                    values.addressType ===
                                                    'commercial'
                                                }
                                                invalid={
                                                    touched.addressType &&
                                                    errors.addressType
                                                }
                                            />
                                            Commercial
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </CCol>
                            <CCol xs="12">
                                <FormGroup tag="fieldset">
                                    <Label for="settlementType">
                                        Settlement Type
                                    </Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="settlementType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'lowRise'}
                                                checked={
                                                    values.settlementType ===
                                                    'lowRise'
                                                }
                                                invalid={
                                                    touched.settlementType &&
                                                    errors.settlementType
                                                }
                                            />
                                            Single Dwelling
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="settlementType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'highRise'}
                                                checked={
                                                    values.settlementType ===
                                                    'highRise'
                                                }
                                                invalid={
                                                    touched.settlementType &&
                                                    errors.settlementType
                                                }
                                            />
                                            High Rise/Multiple Units
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CCollapse
                                    show={values.settlementType === 'highRise'}>
                                    <Col>
                                        <CFormGroup>
                                            <CLabel htmlFor="postalCode">
                                                Unit No
                                            </CLabel>
                                            <CInput
                                                type="text"
                                                name="unitNo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.unitNo}
                                                invalid={
                                                    touched.unitNo &&
                                                    errors.unitNo
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.unitNo}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </Col>
                                </CCollapse>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="postalCode">
                                        Postal Code
                                    </CLabel>
                                    <CInput
                                        id="postalCode"
                                        name="postalCode"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.postalCode}
                                        invalid={
                                            touched.postalCode &&
                                            errors.postalCode
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.postalCode}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="streetNumber">
                                        Street Number
                                    </CLabel>
                                    <CInput
                                        id="streetNumber"
                                        name="streetNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.streetNumber}
                                        invalid={
                                            touched.streetNumber &&
                                            errors.streetNumber
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.streetNumber}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="route">
                                        Route / Lot No / Plot No / Local
                                        Identifier
                                    </CLabel>
                                    <CInput
                                        id="route"
                                        name="route"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.route}
                                        invalid={touched.route && errors.route}
                                    />
                                    <CInvalidFeedback>
                                        {errors.route}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="locality">Locality</CLabel>
                                    <CInput
                                        id="locality"
                                        name="locality"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.locality}
                                        invalid={
                                            touched.locality && errors.locality
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.locality}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            {values.rural && (
                                <>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="lotNo">
                                                Lot No
                                            </CLabel>
                                            <CInput
                                                id="lotNo"
                                                name="lotNo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lotNo}
                                                invalid={
                                                    touched.lotNo &&
                                                    errors.lotNo
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.lotNo}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="plotNo">
                                                Plot No
                                            </CLabel>
                                            <CInput
                                                id="plotNo"
                                                name="plotNo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.plotNo}
                                                invalid={
                                                    touched.plotNo &&
                                                    errors.plotNo
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.plotNo}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="region">
                                                Region
                                            </CLabel>
                                            <CInput
                                                id="region"
                                                name="region"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.region}
                                                invalid={
                                                    touched.region &&
                                                    errors.region
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.region}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="province">
                                                Province
                                            </CLabel>
                                            <CInput
                                                id="province"
                                                name="province"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.province}
                                                invalid={
                                                    touched.province &&
                                                    errors.province
                                                }
                                            />
                                            <CInvalidFeedback>
                                                {errors.province}
                                            </CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol>
                                </>
                            )}
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="city">
                                        City / Province / State
                                    </CLabel>
                                    <CInput
                                        id="city"
                                        name="city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        invalid={touched.city && errors.city}
                                    />
                                    <CInvalidFeedback>
                                        {errors.city}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="country">Country</CLabel>
                                    <CInput
                                        id="country"
                                        name="country"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                        invalid={
                                            touched.country && errors.country
                                        }
                                    />
                                    <CInvalidFeedback>
                                        {errors.country}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="country">Users</CLabel>
                                    <AntdSelect
                                        mode="multiple"
                                        onSearch={onSearchUsers}
                                        notFoundContent={
                                            loadingUsers
                                                ? 'Searching...'
                                                : undefined
                                        }
                                        filterOption={false}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        name={'users'}
                                        value={values.users}
                                        invalid={touched.users && errors.users}
                                        options={users.map((u) => ({
                                            value: u.id,
                                            label: `${u.mobileNumber} (${u.firstName} ${u.lastName})`,
                                        }))}
                                    />
                                    <CInvalidFeedback>
                                        {errors.country}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CFormGroup row>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">
                                        Primary Address
                                    </CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        id="primaryAddress"
                                        name="primaryAddress"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.primaryAddress}
                                    />
                                </CCol>
                                <CCol xs="3">
                                    <CLabel htmlFor="password">Rural</CLabel>
                                    <CSwitch
                                        className={'mx-1'}
                                        variant={'3d'}
                                        color={'primary'}
                                        id="rural"
                                        name="rural"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.rural}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CInput
                                        type="hidden"
                                        invalid={errors.inValidProperty}
                                    />
                                    <CInvalidFeedback>
                                        {errors.inValidProperty}
                                    </CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                size="sm"
                                color="primary">
                                {isSubmitting ? (
                                    <CSpinner size="sm" />
                                ) : (
                                    'Submit'
                                )}
                            </CButton>{' '}
                            <CButton
                                type="reset"
                                size="sm"
                                color="danger"
                                onClick={() => resetForm()}>
                                Reset
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CForm>
            </CCol>
            <CCol md={6} className="pb-4 d-flex flex-column">
                <CLabel>Property location</CLabel>
                <div className="d-flex flex-fill">
                    <div className={'map-top-actions'}>
                        <div className={'search-actions'}>
                            <CForm onSubmit={onSubmitSearchText}>
                                <CInput
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.currentTarget.value)
                                    }
                                    placeholder={'Search...'}
                                />
                            </CForm>
                        </div>
                    </div>
                    <Map />
                </div>
            </CCol>
        </CRow>
        </CTabPane>
        <CTabPane data-tab="profile"  active={activeTab === 1}>
        {match.params.id || unitInfoReady?
        <div>
        <ReactTable
          data={tableData}
          columns={makeTableColumns(totalUnitsEachFloor)}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>:
      <div>
          <CForm onSubmit={onSubmitBuildRoomNumber}>
          <CCard>

            <CCardBody>
            <CRow>
                <CCol md={3}><Label for="totalFloors">Total Floors</Label></CCol>
                <CCol md={2}>
                            <Input
                                type="text"
                                name="totalFloors"
                                onChange={(e) =>
                                    setTotalFloors(e.currentTarget.value)
                                }
                                value={totalFloors}
                                invalid={touched.totalFloors && errors.totalFloors}
                            />
                    </CCol>
                    <CCol md={3}><Label for="totalUnitsEachFloor">Total Units each floor</Label></CCol>
                    <CCol md={2}>
                            <Input
                                type="text"
                                name="totalUnitsEachFloor"
                                onChange= {(e) =>
                                    setTotalUnitsEachFloor(e.currentTarget.value)
                                }
                                value={totalUnitsEachFloor}
                                invalid={touched.totalUnitsEachFloor && errors.totalUnitsEachFloor}
                            />                    
                    </CCol>
                    <CCol md={2}>
                        <CButton type="submit"
                                    size="sm"
                                    color="primary">Submit</CButton>
                    </CCol>
                </CRow>
                </CCardBody>
                </CCard>
            </CForm>
          </div>}

        </CTabPane>
        {
            match.params.id?
            <CTabPane data-tab="tenants" >
                <PropertyTenants propertyId={match.params.id}
                />
            </CTabPane>:null

        }

      </CTabContent>
    </CTabs>

        
    );
};

export default PropertyEdit;
