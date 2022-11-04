import React from "react";

import Footer from '../pages/newHome/Footer';
import Header from '../pages/newHome/Header';

const HomeLayout = ({children}) => {
    return (
        <main>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </main>
    );
};

export default HomeLayout;
