import React from 'react';
import Sidebar from './common/sidebar-component/sidebar';
import Footer from './common/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/loader';
import Header from './common/header-component/header';


const AppLayout = ({ children }) => {
    return (
        <div>
            <Loader />
            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-body">
                        {children}
                    </div>
                    <Footer />
                   
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;