import React from 'react';
import Sidebar from './Sidebar';
import './styles/Layout.css';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, sidebarContent }) => {
    const location = useLocation();
    const hideSidebar = location.pathname.startsWith('/products/');

    return (
        <div className="layout">
            {!hideSidebar && <Sidebar content={sidebarContent} />}
            <div className="page-content">{children}</div>
        </div>
    );
};

export default Layout;