import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductCard.css';
import Layout from './Layout';

const SearchResultsPage = ({categories}) => {
    const location = useLocation();
    const navigate = useNavigate(); 

    const query = new URLSearchParams(location.search).get('query');
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/search?query=${query}`);
                setSearchResults(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Search failed:', error);
                setError('Arama sonuçları alınamadı. Lütfen daha sonra tekrar deneyin.');
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

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

    const handleCategoryClick = (category) => {
        navigate(`category/${category}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <Layout
            sidebarContent={sidebarContent}
            isBackButtonVisible={false}
        >
            <div className="page">
                <h1>Arama Sonuçları</h1>
                {loading && <p>Yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="product-list">
                    {searchResults.map((product) => (
                        <div
                            className="product-card"
                            key={product.product_id}
                            onClick={() => handleProductClick(product.product_id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`${product.img_url}`}
                                alt={product.product_name}
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                            <h2>{product.product_name}</h2>
                            <p>Fiyat: {product.lowest_price || 'Bilinmiyor'} TL</p>
                            <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        className="button"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Önceki
                    </button>
                    <span>Sayfa {page}</span>
                    <button
                        className="button"
                        onClick={() => setPage(page + 1)}
                        disabled={products.length < 50}
                    >
                        Sonraki
                    </button>
                </div>
            </div>

        </Layout>
    );
};

export default SearchResultsPage;