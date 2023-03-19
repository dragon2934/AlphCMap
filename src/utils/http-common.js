import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

// export const fetchUser = (id) => {
//   return (dispatch, getState) => {
//       const token = getState().auth.jwt;

//       return dispatch({
//           type: ADMIN_FETCH_USER,
//           payload: fetch(`${SERVICE_URL}/users/${id}?tenant=${PARTNER_TOKEN}`, {
//               headers: {
//                   Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${token}`,
//               },
//               method: 'GET',
//           })
//               .then((r) => r.json())
//               .then((responseData) => {
//                   if (responseData.statusCode >= 300) {
//                       return Promise.reject(responseData);
//                   } else {
//                       return responseData;
//                   }
//               }),
//       });
//   };
// };
