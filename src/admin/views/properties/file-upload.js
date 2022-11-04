import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../../../site/pages/newHome/Header';
import FilesUpload from '../../file-upload/components/FilesUpload';

const PropertyFileUpload = () => {
  return (
    <main>
        <Header />
        <div className="content">
    <div className="container" style={{ width: "600px" }}>
      <div className="my-3">
        <h4>PDF Files Upload</h4>
      </div>

      <FilesUpload />
    </div>
    </div>
    </main>
  );
}

export default PropertyFileUpload;
