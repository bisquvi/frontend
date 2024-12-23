import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductCard.css';
import Layout from './Layout';

const SearchResultsPage = ({ categories }) => {
    const location = useLocation();
    const navigate = useNavigate(); 

    const query = new URLSearchParams(location.search).get('query');
    const page = parseInt(new URLSearchParams(location.search).get('page')) || 1;
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/search?query=${query}&page=${page}`);
                setSearchResults(response.data.products);
                setTotalPages(response.data.totalPages);
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
    }, [query, page]);

    const handleCategoryClick = (category) => {
        navigate(`category/${category}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handlePageChange = (newPage) => {
        navigate(`/search?query=${query}&page=${newPage}`);
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
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Önceki
                    </button>
                    <span>Sayfa {page}</span>
                    <button
                        className="button"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Sonraki
                    </button> 
                </div>
            </div>
        </Layout>
    );
};

export default SearchResultsPage;