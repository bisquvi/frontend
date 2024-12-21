// filepath: /frontend/src/StoreContext.js
import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // Genel durumlar
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // AttributePage durumları
    const [products, setProducts] = useState([]);
    const [attributeName, setAttributeName] = useState('');
    const [orderbyClause, setOrderbyClause] = useState('popularity');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Diğer bileşenlerin durumları
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);
    const [attributes, setAttributes] = useState({});

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        products,
        setProducts,
        attributeName,
        setAttributeName,
        orderbyClause,
        setOrderbyClause,
        sortOrder,
        setSortOrder,
        loading,
        setLoading,
        error,
        setError,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
        expandedSubcategory,
        setExpandedSubcategory,
        attributes,
        setAttributes,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};