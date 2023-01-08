import React, { useState, useEffect, useRef } from "react";
import UploadService from "../services/FileUploadService";
import { listFiles, updateProperty, updateLatLng } from '../../../redux/actionCreators/adminActionCreators';
import { useDispatch, useSelector } from 'react-redux';

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.jwt);
  // console.log('token =' + token );


  useEffect(() => {
    dispatch(listFiles()).then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    console.log('file selected..' + JSON.stringify(event.target.files));
    setProgressInfos({ val: [] });
  };

  const uploadFile = async (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    // dispatch(uploadFiles()).then((response) => {
    //   setFileInfos(response.data);
    // });
    console.log('uploading ..file=' + JSON.stringify(file));
    return UploadService.upload(file, token, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then((resp) => {
        setMessage((prevMessage) => ([
          ...prevMessage,
          "Uploaded the file successfully: " + file.name,
        ]));
        //Do update database for property
        //resp.url
        // console.log('upload completed...' + JSON.stringify(resp));
        dispatch(updateProperty(file.name, resp.data[0].url)).then((response) => {
          console.log(' update property..' + JSON.stringify(response));
          //upload next
          const files = Array.from(selectedFiles);
          idx = idx + 1;
          if (idx < files.length) {
            sleep(500);
            uploadFile(idx, files[idx]);
          } else {
            //upload completed
            // setMessage([]);
            setMessage((prevMessage) => ([
              ...prevMessage,
              "Uploaded Completed,now update Lat/Lng for the property, please wait.... ",
            ]));
            dispatch(updateLatLng()).then(resp => {
              setMessage((prevMessage) => ([
                ...prevMessage,
                "update Lat/Lng successful ",
              ]));
            }).catch(error => {
              setMessage((prevMessage) => ([
                ...prevMessage,
                "update Lat/Lng error: " + JSON.stringify(error),
              ]));
            })


          }

        }).catch(error => {
          console.log('update property error..' + JSON.stringify(error));
        });

      })
      .catch((error) => {
        console.log('upload file error..' + JSON.stringify(error));
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => ([
          ...prevMessage,
          "Could not upload the file: " + file.name,
        ]));
      });
  };
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const uploadSelectedFiles = () => {
    const files = Array.from(selectedFiles);
    console.log('files...' + JSON.stringify(files));

    let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

    progressInfosRef.current = {
      val: _progressInfos,
    }

    //Start upload
    uploadFile(0, files[0]);

    // const uploadPromises = files.map((file, i) =>{ 
    //   uploadFile(i, file);
    //   sleep(500);//wait for database update
    // });

    // Promise.all(uploadPromises)
    //   .then((files) => {
    //     setFileInfos(files.data);
    //     console.log('all uploads...' + files.data);
    //   });

    // setMessage([]);
  };

  return (
    <div>
      {progressInfos && progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" multiple onChange={selectFiles} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadSelectedFiles}
          >
            Upload
          </button>
        </div>
      </div>

      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

      <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadFiles;
