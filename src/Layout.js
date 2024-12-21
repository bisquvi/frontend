import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './styles/Layout.css';
import { useLocation } from 'react-router-dom';


const Layout = ({ children, sidebarContent}) => {
    const location = useLocation();
    return (
        <div className="layout">
            <Sidebar content={sidebarContent}/>
            <div className="page-content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;