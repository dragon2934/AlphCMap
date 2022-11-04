import React from "react";

const Splash = () => {
    return (
        <div className="full-screen splash-screen isLoading">
              <img
                className="splash-image"
                src={'/assets/img/logo-alphc.png'}
                alt={'logo'}
            />
            <h1 className="splash-text">INFINITE POSSIBILITIES</h1>
        </div>
    );
};

export default Splash;
