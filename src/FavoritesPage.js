import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = ({ categories, isLoggedIn, setIsLoggedIn }) => {
    const [favorites, setFavorites] = useState([]); // Favori ürünler
    const [loading, setLoading] = useState(true); // Yükleniyor durumu
    const [error, setError] = useState(null); // Hata durumu
    const [page, setPage] = useState(1); // Sayfa numarası
    const [pageSize] = useState(10); // Sayfa başına ürün sayısı
    const navigate = useNavigate();

    // Favori ürünleri al
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    params: { userId: 1, page, pageSize } // Sayfalama parametreleri
                });
                setFavorites(response.data.favorites); // Favori ürünleri state'e kaydet
                setLoading(false); // Yükleniyor durumunu false yap
            } catch (err) {
                setError('Favoriler yüklenirken bir hata oluştu!');
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [page, pageSize]); // Sayfa değiştiğinde tekrar veri çek
    

    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); // Ürüne tıklandığında ilgili sayfaya yönlendir
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
            isBackButtonVisible={false} // Geri Dön tuşu ana sayfada görünmez
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
        >
            <div className="page">
                <h1>Favoriler</h1>
                {loading && <p>Yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="product-list">
                    {favorites.map((product) => (
                        <div
                            className="product-card"
                            key={product.product_id}
                            onClick={() => handleProductClick(product.product_id)} // Tıklama işlevi
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`${product.img_url}`} // Ürün görseli
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
            <div className="pagination">
                <button className='button' onClick={() => setPage(page - 1)} disabled={page === 1}>Önceki</button>
                <span>Sayfa {page}</span>
                <button className='button' onClick={() => setPage(page + 1)} disabled={favorites.length < pageSize}>Sonraki</button>
            </div>
        </Layout>
    );
};

export default FavoritesPage;
