import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Homepage.css';

const Homepage = ({ categories, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Kategoriye tıklama işlemi
    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
    };

    // Ürüne tıklama işlemi
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Ürün detay sayfasına yönlendirme
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ürünler alınamadı:', error);
                setError('Ürünler alınamadı. Lütfen daha sonra tekrar deneyin.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Layout
            sidebarContent={sidebarContent}
            isBackButtonVisible={false} // Geri Dön tuşu ana sayfada görünmez
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
        >
            <div className="homepage">
                <h1>Popüler Ürünler</h1>

                {loading && <p>Yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="product-list">
                    {products.map((product) => (
                        <div
                            className="product-card"
                            key={product.product_id}
                            onClick={() => handleProductClick(product.product_id)} // Tıklama işlevi
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`${product.img_url}`}
                                alt={product.product_name}
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                            <h2>{product.product_name}</h2>
                            <p>Fiyat: {product.lowest_price} TL</p>
                            <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;