import React from "react";

const Splash = () => {
    return (
        <div className="full-screen splash-screen isLoading">
            <h1 className="splash-text" style={{ marginBottom: "60px" }}>KloserToYou</h1>
            <img
                className="splash-image"
                src={'/assets/img/logo-alphc.png'}
                alt={'logo'}
            />
            <h1 className="splash-text">INFINITE MARKETING POSSIBILITIES</h1>
        </div>
    );
};

export default Splash;
