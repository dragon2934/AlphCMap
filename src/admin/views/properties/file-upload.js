import React, { useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CButton,
} from '@coreui/react';

import FilesUpload from '../../file-upload/components/FilesUpload';

import { TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { batchImportCompany } from '../../../redux/actionCreators/adminActionCreators';
import { toastr } from 'react-redux-toastr';
const PropertyFileUpload = () => {
  const uploadedFiles = useSelector((state) => state.admin.uploadedFiles);
  const dispatch = useDispatch();
  const importCSVData = useCallback(() => {
    console.log('. start to import csv data...uploadedFiles..' + JSON.stringify(uploadedFiles));
    const data = {
      fileName: uploadedFiles[0].url
    }
    dispatch(batchImportCompany(data)).then(resp => {
      console.log('...batch import ..', resp);
    }).catch(error => {
      console.log('..import error');
      toastr.error('Error', 'Data import failed');
    });
  });
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">

        <TheHeader />
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid className={'h-100'}>
              <div className="content">
                <div className="container" style={{ width: "600px" }}>
                  <div className="my-3">
                    <h4>Batch  Import Company</h4>
                  </div>

                  <FilesUpload extension={'.csv'} />

                  <hr />
                  <CButton
                    onClick={() =>
                      importCSVData()
                    }
                    type="button"
                    size="sm"
                    color="primary">
                    Import
                  </CButton>{' '}
                </div>
              </div>
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </div>
    </div>
  );
}

export default PropertyFileUpload;
