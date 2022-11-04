import http from "./http-common";
import {SERVICE_URL} from '../../../constants';
// const { listFiles,uploadFiles} = require('../../../redux/actionCreators/adminActionCreators');
const upload = (file,token, onUploadProgress) => {
  let formData = new FormData();

  formData.append("files", file);

  return http.post(SERVICE_URL+"/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress,
  });
};

const getFiles = (token) => {
  return http.get(
    SERVICE_URL+"/upload/files?_limit=10&_start=0&_sort=updatedAt:DESC");
  // return listFiles();
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService; 
