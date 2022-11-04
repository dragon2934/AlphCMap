export const utilsTools ={
    getTokenByDomain:()=>{
        let url= window.location.host;
        url = url.replaceAll('.','_');
        url = url.replaceAll(':','_');
        url = url.toUpperCase();
        let envKey = 'REACT_APP_TOKEN_'+url;
        let token=  process.env[envKey];
        // console.log('envKey='+envKey + ' token=' + token);
        return token;
     },
     range: (len) => {
        const arr = [];
        for (let i = len; i >= 1; i--) {
          arr.push(i);
        }
        // console.log('Array=' + JSON.stringify(arr));
        return arr;
    },
    newRoomNumber:(floor,totalUnitsEachFloor) =>{
        let roomNumber = '';
        let roomJSONString = "{";
        for(var unit=0;unit <= totalUnitsEachFloor;unit++){
            if(unit==0){
            }else if(unit>0 && unit<10){
                roomNumber = floor.toString() + '0'+ unit.toString();
            }else{
                roomNumber = floor.toString() + unit.toString();
            }
            if(unit==0){
                roomJSONString = roomJSONString + '"Floor":"'+floor+'",';
            }else{
                roomJSONString = roomJSONString + '"Unit'+unit+'":"'+roomNumber+'",';
            }
            
        }
        roomJSONString = roomJSONString.substring(0,roomJSONString.length-1);
        roomJSONString = roomJSONString + "}";
        // console.log('newRoomNumber:' + roomJSONString);
        //array to json
        // console.log(' roomNumber=' + roomNumber + ' floor=' + floor + ' unit=' + unit);
        return JSON.parse(roomJSONString);
    },
    makeData:(floosTotal,totalUnitsEachFloor) =>{
        let tableData = utilsTools.range(floosTotal).map(f => {
          return {
            ...utilsTools.newRoomNumber(f,totalUnitsEachFloor),
          };
        });
        //  console.log('makeData:' + JSON.stringify(tableData));
        return tableData;
    },
    checkUseLevel:(roleName) =>{
        if(roleName === process.env.REACT_APP_ROLE_ADMIN_NAME) return 1;
        if(roleName === process.env.REACT_APP_ROLE_PM_NAME) return 1;
        return 3;
    },
    isAppEmbedWebview:() =>{
        return  window.ReactNativeWebView ? true : false
    },
    checkPrimaryHolder:(users,currentUserId) =>{
        let isPrimary=false;
        users.map (user=>{
            if(user.id == currentUserId && user.primaryHolder){
                console.log(' current user is primary holder');
                isPrimary = true;
            } 
        });
        return isPrimary;
    }
}
// module.exports = utilsTools;