import React from "react";

import Footer from '../pages/newHome/Footer';
import Header from '../pages/newHome/Header';
import AccountVerification from "../pages/AccountVerification";
const HomeLayout = ({children}) => {
    return (
        <main>
            <Header />
            <div className="content">{children}</div>
            <Footer />
            <AccountVerification />
        </main>
    );
};

export default HomeLayout;
