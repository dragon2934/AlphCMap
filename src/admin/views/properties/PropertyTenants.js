import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import utilsTools from "../../../utils/utils";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {
    fetchProperty,
    fetchPropertyResidents,
    fetchPropertiesByLandlordId
} from '../../../redux/actionCreators/adminActionCreators';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';

const PropertyTenants = ({propertyId}) => {
    const [totalFloors, setTotalFloors] = useState( 15);
    const [totalUnitsEachFloor,setTotalUnitsEachFloor] = useState(10);
    const [unitInfoReady,setUnitInfoReady] = useState(false);
    const [tableData,setTableData] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.auth.user);
    const [greyData,setGreyData] = useState([]);
    const [greying,setGreying] = useState(0);
    const [residents, setResidents] = useState([]);
 

    const formik = useFormik({
        initialValues: {
            id: '',
            totalFloors:'1',
            totalUnitsEachFloor:'1',
        },
    });

    const {
        setValues,
    } = formik;



    useEffect(() => {
        console.log( 'propertyId 888888 =' + propertyId);
        if (propertyId){
            dispatch(fetchProperty(propertyId)).then(
                ({value: property}) => {
                    delete property.property_alert;

                    setValues({
                        ...property,
                        ...property.location,
                        users: property.users.map((u) => u.id),
                    });
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
    }, [propertyId,dispatch, setValues]);

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
        return columns;
    }
    return unitInfoReady?(
        <ReactTable
          data={tableData}
          columns={makeTableColumns(totalUnitsEachFloor)}
          defaultPageSize={10}
          className="-striped -highlight"
        />
    ):(
        <div>
            loading...
        </div>
    );

}
export default PropertyTenants;