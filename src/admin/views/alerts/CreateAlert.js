import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CInvalidFeedback,
    CLabel,
    CCollapse,
    CListGroup,
    CListGroupItem,
    CRow,
} from '@coreui/react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {fetchProperties,
    fetchProperty,
    fetchPropertiesByLandlordId
} from '../../../redux/actionCreators/adminActionCreators';
import {createAlert,createHelpAlert} from '../../../redux/actionCreators/alertActionCreators';
import PropertiesMap from '../properties/PropertiesMap';
import {useSelector} from 'react-redux';
import {Col, FormGroup, Input, Label} from 'reactstrap';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import utilsTools from '../../../utils/utils';

const CreateAlert = () => {
    const [draw, setDraw] = useState(null);
    const [drawedBefore, setDrawedBefore] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [properties, setProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [name, setName] = useState('');
    const [feature, setFeature] = useState(null);

    const [totalFloors, setTotalFloors] = useState( 15);
    const [totalUnitsEachFloor,setTotalUnitsEachFloor] = useState(10);
    const [unitInfoReady,setUnitInfoReady] = useState(false);
    const [tableData,setTableData] = useState([]);
    
    const [greyData,setGreyData] = useState([]);
    const [greying,setGreying] = useState(0);
    const [residents, setResidents] = useState([]);
 

    const user = useSelector((state) => state.auth.user);
    let userName = '';
    let mobileNumber ='';
    

    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
        if(userName.length<1){
            userName = user.username;
        }
        mobileNumber = user.mobileNumber;
        // setSender(userName);
        // console.log('logined user=' + JSON.stringify(user));
    } catch (e) {}
    
    const [sender,setSender] = useState(userName);
    const [alertType,setAlertType] = useState('');
    const [alertNameOthers,setAlertNameOthers] = useState('');
    const [senderMobileNumber,setSenderMobileNumber] = useState(mobileNumber);
    const [selectedPropertyEmail,setSelectedPropertyEmail] = useState([]);
    const {map, clearContext} = useContext(MapContext);
    const dispatch = useDispatch();

    const history = useHistory();

 
    const getCellDataInTable = (floor,unitNo) =>{
        let floorData = tableData;
        let selectedFloor = floorData[floor];
        //check residents
        if(residents!=null && residents!=undefined){
            //在用户里面按用户ID 来查找用户
            let searchedUnit = residents.find( room =>{
                return room.unitNo == selectedFloor[unitNo];
            });
            if(searchedUnit!=null && searchedUnit!=undefined){
                // console.log('find it');
                let data = searchedUnit.users[0].mobileNumber;
                return data;
            }
        }

        let data = selectedFloor[unitNo];
        
        return data;
    }

    const renderEditable =(cellInfo) =>{
        // console.log('grey .....index=' + cellInfo.index +' data=' + greyData[cellInfo.index]);
        const data = tableData;
        if( greying===0){
            return (
                <div
                  style={{ backgroundColor: "#fafafa" }}
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{
                      __html: getCellDataInTable(cellInfo.index,cellInfo.column.id)
                  }}
                />
            );
        } else{
            return greyData[cellInfo.index]==1? data[cellInfo.index][cellInfo.column.id] : (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{
                        __html: getCellDataInTable(cellInfo.index,cellInfo.column.id)
                    }}
                />
                );
        }
    };  
    const handleFloorClick  =(e,cell) =>{
        const checked = e.target.checked;
        let data = greyData;
        console.log('floor=' +cell.Floor);
        if (checked) {
         //checked
         data[ totalFloors - parseInt( cell.Floor)  ] = 1;
         filterTenants(cell.Floor,checked,cell);
         setGreyData(data);
         console.log('handleFloorClick= checked .... .......'  );
         
        //  setGreying(totalFloors - parseInt( cell.target.id)+1);
        } else {
         //unchecked
         data[ totalFloors - parseInt( cell.Floor)  ] = 0;
         filterTenants(cell.Floor,checked,cell);
         setGreyData(data);
         console.log('handleFloorClick= unchecked.... .......'   );
        //  setGreying(totalFloors - parseInt( cell.target.id));
        }
        
        
    }
    const handleCheckAll  = (e) =>{
        const checked = e.target.checked;
        let data = greyData;
        if (checked) {
         //checked
         console.log('All need to send, list all tenants');
         for(var i=0; i< totalFloors;i++){
            data[i] = 1;
         }
         console.log('grey data=' + JSON.stringify(data));
         setGreyData(data);
         filterTenants(0,true,null);
         setGreying(totalFloors);
        } else {
         //unchecked
         console.log('clear all tenants selected');
         for(var i=0; i< totalFloors;i++){
            data[i] = 0;
         }
         setGreyData(data);
         filterTenants(0,false,null);
         setGreying(1);
        }
        
    };

    const filterTenants = (floorNo,isCheck,cell) =>{
        if(floorNo === 0){
            //all tenants
            if(isCheck){
                //fill all tenants to selectedProperties
                if(residents!=null && residents!=undefined){
                    // console.log('residents=' + JSON.stringify(residents));
                    let selected =[];
                    residents.map(resident =>{
                        let columnJson ={
                            "Email":resident.email
                        }
                        selected.push(columnJson)
                    });
                    setSelectedProperties(residents);
                    setSelectedPropertyEmail(selected);
                }
            }else{
                //clear all tenants
                setSelectedProperties([]);
                setSelectedPropertyEmail([]);
            }
        }else{
            let floorData = tableData;
            let selectedFloor = floorData[floorNo];
            // console.log('cell data=' + JSON.stringify(cell));
            let selected =[];
            let alertProperties = [];
            for(var i=1; i <= totalUnitsEachFloor;i++){
                const queryUnit = cell["Unit"+i];
                // console.log('unit no=' + queryUnit);
                let searchedUnit = residents.find( room =>{
                    return room.unitNo == queryUnit;
                });
                if(searchedUnit){
                    let columnJson ={
                        "Email":searchedUnit.email
                    }
                    selected.push(columnJson);
                    alertProperties.push(searchedUnit);
                }else{
                    console.log(queryUnit +' tenant not found?' );
                }
            }
            if(isCheck){
                //add this floor's tenants
                if(residents!=null && residents!=undefined){
                    // console.log('current selected =' + JSON.stringify(selectedProperties));
                    if(selectedProperties!=null && selectedProperties!=undefined){
                        selectedProperties.forEach(property=>{
                            alertProperties.push(property);
                        });
                        // alertProperties.push(selectedProperties);
                    }
                    if(selectedPropertyEmail!=null && selectedPropertyEmail!=undefined){
                        selectedPropertyEmail.forEach(email=>{
                            selected.push(email);
                        });
                    }
                    setSelectedProperties(alertProperties);
                    // console.log('now selected=' + JSON.stringify(selected));
                    setSelectedPropertyEmail(selected);
                }
            }else{
                //clear this floor's tenants
                console.log(' need to remove:' + JSON.stringify(selected));
                if(residents!=null && residents!=undefined){
                    console.log('start to remove current selected =' + JSON.stringify(selectedPropertyEmail));
                    let tempProperties=[];
                    if(selectedProperties!=null && selectedProperties!=undefined){
                        selectedProperties.forEach(property=>{
                            var queryProperty = selected.find(emailSelected=>{
                                return emailSelected.Email == property.Email;
                            });
                            if(queryProperty===null || queryProperty === undefined){
                                tempProperties.push(property);
                            }
                        });
                        // alertProperties.push(selectedProperties);
                    }
                    let tempSelected=[];
                    if(selectedPropertyEmail!=null && selectedPropertyEmail!=undefined){
                        selectedPropertyEmail.forEach(emailOriginal=>{
                            let queryEmail= selected.find( emailSelected =>{
                                return emailSelected.Email == emailOriginal.Email;
                            });
                            console.log('1=' + JSON.stringify(emailOriginal)+ ' 2=' + JSON.stringify(queryEmail));
                            if(queryEmail===null || queryEmail === undefined){
                                tempSelected.push(emailOriginal);
                            }
                           
                            // setSelectedPropertyEmail( selectedPropertyEmail.filter(emailFilter =>{
                            //     return emailFilter.Email !=email.Email;
                            // }));
                           
                            // selectedPropertyEmail.pop(email);
                        });
                    }
                    // selected = selectedPropertyEmail;
                    console.log('now is:' + JSON.stringify(tempSelected));
                    // aler/tProperties = selectedProperties;
                    setSelectedProperties(tempProperties);
                    // console.log('now selected=' + JSON.stringify(selected));
                    setSelectedPropertyEmail(tempSelected);
                }
            }
        }
    }
    const makeAlertTableColumns=() =>{
        let columns =[];
        let lblEmail =
        {
            width: "100%",
            Header: 'Properties',
            accessor: "Email",
            sortable:false,
            Cell: ({ original }) => (
                original.Email + '@alphc.com'
            ),
        }
        columns.push(lblEmail);
        return columns;
    }
    const makeTableColumns=(unitsPerFloor) =>{
        let columns =[];
        let lblFloor =
        {
            width: 60,
            Header: () => (
                <input type="checkbox" id="cbAll" onClick={(e) => {
                    handleCheckAll(e);
                }} />
              ),
            accessor: "Floor",
            sortable:false,
            Cell: ({ original }) => (
             greying == totalFloors ?
                    '✓'
                    :<input type="checkbox" defaultChecked={greyData[totalFloors - original.Floor] === 1} id={'Floor_'+original.Floor} onClick={(e) =>handleFloorClick(e,original)} />
            
              ),
        }
        columns.push(lblFloor);
        for(var i=1; i<= unitsPerFloor;i++){
            let header = {
                Header: "Unit-" + i,
                accessor: "Unit" + i,
                sortable:false,
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
        return columns;
    }

    useEffect(() => {
        if(utilsTools.checkUseLevel(user.role.name)===1){
            dispatch(fetchProperties({page: 1, pageSize: 100000})).then(
                ({value: properties}) =>
                    setProperties(
                        properties.map((p) => ({
                            type: 'Feature',
                            properties: p,
                            geometry: {
                                type: 'Point',
                                coordinates: [
                                    p.location.longitude,
                                    p.location.latitude,
                                ],
                            },
                        })),
                    ),
            );
        }else{
            const propertyId = user.property.id;
            // console.log( 'propertyId 888888 =' + propertyId +' user=' + JSON.stringify(user));
            if (propertyId){
                dispatch(fetchProperty(propertyId)).then(
                    ({value: property}) => {
                        delete property.property_alert;
    
                        // setValues({
                        //     ...property,
                        //     ...property.location,
                        //     users: property.users.map((u) => u.id),
                        // });
                        //get all tenants
                        
    
                        // setResidents(property.users);
                        // console.log('setResidents=' + JSON.stringify(property.users));
                        //set units information
                        ///////////////////
                        setTotalFloors(property.totalFloors);
                        setTotalUnitsEachFloor(property.totalUnitsEachFloor);
                        let roomJSON =  property.roomJSON;
                        if(roomJSON!=null && roomJSON!=undefined){
                            setTableData(JSON.parse(roomJSON));
                            let greyJSON = property.greyJSON;
                            if(greyJSON!=null && greyJSON !=undefined){
                                setGreyData(JSON.parse(greyJSON));
                            }
                            setGreying(1);
                            setUnitInfoReady(true);
                        }else{
                            let data =utilsTools.makeData(totalFloors,totalUnitsEachFloor);
                            //create grey out array
                            // let floorData = matrix(totalFloors,totalUnitsEachFloor,0);
                            const floorData = [];
                            for (let i = 0; i < totalFloors; i++) {
                                floorData.push(i);
                                floorData[i]=0;
                            }
                            setGreyData(floorData);
                            // console.log('table data='+JSON.stringify(floorData));
                            setTableData(data);
                            setUnitInfoReady(true);
                        }
    
    
                    },
                );
                dispatch(
                    fetchPropertiesByLandlordId(propertyId),
                ).then(({value: residents}) =>{ 
                    // console.log('get residents..' + JSON.stringify(residents));
                    setResidents(residents);
                    
                });
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (map) {
            const draw = new MapboxDraw({
                controls: {
                    point: false,
                    line_string: false,
                    polygon: false,
                    trash: false,
                    combine_features: false,
                    uncombine_features: false,
                },
            });
            setDraw(draw);

            map.addSource('area', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: 'area',
                type: 'fill',
                source: 'area',
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });
        }
    }, [clearContext, map]);

    useEffect(() => {
        return () => {
            if (map) {
                map.removeLayer('area');
                map.removeSource('area');
            }
        };
    }, [map]);

    const onClickCreateAlert = useCallback(() => {
        let alertText = alertType+"! " ;
        if( name !='Others'){
            alertText = alertText + name;
        }
        if(alertNameOthers !=null && alertNameOthers!=undefined && alertNameOthers.length >0 ){
            alertText = alertText + alertNameOthers;
        }
        console.log('Alert Text=' + alertText);
        dispatch(
            createAlert({
                mobileNumber:senderMobileNumber,
                name:alertText,
                properties: selectedProperties.map((i) => i.properties.id),
                geojson: feature,
                sender:sender,
                tenant: user.tenant
            }),
        ).then(({value: alert}) => {
            history.push(`/admin/alerts/${alert.id}`);
        });
    }, [dispatch, feature, history, name, selectedProperties,alertNameOthers]);

    // const onClickCreateAlert = useCallback(() => {
    //     // console.log('feature =' + JSON.stringify(feature));
    //     let alertText = alertType+"! " ;
    //     if( name !='Others'){
    //         alertText = alertText + name;
    //     }
    //     if(alertNameOthers !=null && alertNameOthers!=undefined && alertNameOthers.length >0 ){
    //         alertText = alertText + alertNameOthers;
    //     }
    //     console.log('Alert Text=' + alertText);
    //     dispatch(
    //         createHelpAlert('43.8090357852464','-79.5348619500976'),
    //     ).then(({value: alert}) => {
    //         history.push(`/admin/alerts/${alert.id}`);
    //     });
    // }, [dispatch, feature, history, name, selectedProperties]);

    const toggleDrawing = useCallback(() => {
        if (!drawing) {
            map.addControl(draw, 'top-left');
            draw.changeMode(draw.modes.DRAW_POLYGON);

            setSelectedProperties([]);

            setFeature(null);

            map.getSource('area').setData({
                type: 'FeatureCollection',
                features: [],
            });
        } else {
            const featureCollection = draw.getAll();
            map.getSource('area').setData(featureCollection);

            // console.log('11=' + JSON.stringify(properties) + ' 12='+ JSON.stringify(featureCollection));
            setSelectedProperties(
                properties.filter((p) =>
                    booleanPointInPolygon(p, featureCollection.features[0]),
                ),
            );
            /////
            let selected =[];
            selectedProperties.map(property =>{
                let columnJson ={
                    "Email":property.properties.email
                }
                selected.push(columnJson)
            });
            console.log(' end drawing 1=' + JSON.stringify(selectedProperties)+ ' 2=' + JSON.stringify(selected));
            setSelectedPropertyEmail(selected);
            setFeature(featureCollection.features[0]);

            map.removeControl(draw);
        }

        setDrawedBefore(true);
        setDrawing(!drawing);
    }, [draw, drawing, map, properties]);

    return (
        <CRow className="h-100">
            <CCol xs="4">
                <CCard>
                    <CCardHeader>
                        New Alert
                        <small className="text-muted"> Create Alert</small>
                        <div className="card-header-actions" />
                    </CCardHeader>
                    <CCardBody>
                    <CCol xs="12">
                                <FormGroup tag="fieldset">
                                    <Label for="postalCode">Alert Type</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                            className="form-check-input"
                                                type="radio"
                                                name="alertType"
                                                onChange={(e) => setAlertType(e.target.value)}
                                                value={'Emergency Alert'}
                                                
                                            />
                                            Emergency Alert
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="alertType"
                                                onChange={(e) => setAlertType(e.target.value)}
                                                
                                                value={'Test Alert'}
                                                 
                                            />
                                            Test Alert
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </CCol>
                        <CCol xs="12">
                        <FormGroup tag="fieldset">
                                    <Label for="postalCode">Alert Name</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                            className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                               
                                                value={'Earthquake'}
                                                
                                            />
                                            Earthquake
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                                value={'Fires'}
                                                 
                                            />
                                            Fires
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                            className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                                
                                                value={'Floods'}
                                                
                                            />
                                            Floods
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                                
                                                value={'Tornadoes'}
                                                 
                                            />
                                            Tornadoes
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                            className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                               
                                                value={'Criminal Activities'}
                                                
                                            />
                                            Criminal Activities
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                                
                                                value={'Active Shooters'}
                                                 
                                            />
                                            Active Shooters
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="alertName"
                                                onChange={(e) => setName(e.target.value)}
                                                
                                                value={'Others'}
                                                 
                                            />
                                            Others
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                         


                            <Col>
                            <Label for="postalCode">Remarks</Label>
                            <CFormGroup>
                                
                                <CInput
                                maxLength={99}
                                    onChange={(e) =>{
                                        console.log('222=' + e.target.value);
                                        setAlertNameOthers(e.target.value);
                                    } }
                                />
                                <CInvalidFeedback></CInvalidFeedback>
                            </CFormGroup>
                            </Col>
                            
                        </CCol>
                       { utilsTools.checkUseLevel( user.role.name)===1?   <CButton
                            block
                            color={!drawing ? 'primary' : 'success'}
                            onClick={toggleDrawing}>
                            {!drawing
                                ? drawedBefore
                                    ? 'Redraw'
                                    : 'Start Drawing'
                                : 'End Drawing'}
                        </CButton>:null}


                        {/* <CButton
                                    color="danger"
                                    block
                                    onClick={onClickCreateAlert}>
                                    Send Alert
                                </CButton> */}

                        {selectedProperties.length > 0 && (
                            <>
                                <p className="mt-5">
                                    Creating alert for following properties:
                                </p>
                                { utilsTools.checkUseLevel( user.role.name) >=2?  <ReactTable
                                data={selectedPropertyEmail}
                                columns={makeAlertTableColumns()}
                                defaultPageSize={10}
                                className="-striped -highlight"
                                />:
                                 <CListGroup accent className="mb-3">
                                    {selectedProperties.map((p) => (
                                        <CListGroupItem key={p.properties.id}>
                                            {p.properties.email}@alphc.com
                                        </CListGroupItem>
                                    ))}
                                </CListGroup> }

                                <CButton
                                    color="danger"
                                    block
                                    onClick={onClickCreateAlert}>
                                    Send Alert
                                </CButton>
                            </>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="8">
              { utilsTools.checkUseLevel( user.role.name) >=2? unitInfoReady?(
                <ReactTable
                data={tableData}
                columns={makeTableColumns(totalUnitsEachFloor)}
                defaultPageSize={20}
                className="-striped -highlight"
                />
                ):(
                    <div>
                        loading...
                    </div>
                ):  <PropertiesMap /> }
            </CCol>
        </CRow>
    );
};

export default CreateAlert;
