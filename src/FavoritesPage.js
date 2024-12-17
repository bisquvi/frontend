import React from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = ({ categories, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
    };

    const sidebarContent = (
        <>
            <h3>Kategoriler</h3>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <Layout
            sidebarContent={sidebarContent}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
        >
            <h1>Favoriler</h1>
            <p>Burada favori ürünlerinizi görebilirsiniz.</p>
        </Layout>
    );
};

export default FavoritesPage;