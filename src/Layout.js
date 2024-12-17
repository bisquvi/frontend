import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './styles/Layout.css';

const Layout = ({ children, sidebarContent, isLoggedIn, setIsLoggedIn }) => {
    return (
        <div className="layout">
            <Sidebar content={sidebarContent} />
            <div className="page-content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;