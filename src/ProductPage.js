import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Products.css';
import Reviews from './Reviews';

const ProductPage = ({ isLoggedIn,  userId }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ürün bilgisi alınamadı. Lütfen tekrar deneyin.');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId, isLoggedIn]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!isLoggedIn) return; // Giriş yapılmadıysa işlem yapma
            try {
                const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
                const favorites = response.data.favorites;
    
                console.log("Favoriler:", favorites);
    
                // Ürün favorilerde mi kontrol et
                setIsFavorite(favorites.includes(productId)); 
            } catch (error) {
                console.error('Favoriler alınamadı:', error);
            }
        };
    
        fetchFavorites();
    }, [productId, isLoggedIn, userId]);
    
    
    const handleFavoriteClick = async () => {
        if (!isLoggedIn) {
            alert("Lütfen favorilere eklemek için giriş yapın.");
            return;
        }
    
        try {
            // Server'a favori ekleme/çıkarma işlemi gönderiyoruz
            const response = await axios.post('http://localhost:5000/api/favorites', {
                userId,
                productId,
            });
    
            // Favori durumu güncelleniyor
            const updatedFavorites = response.data.favorites;
    
            // updatedFavorites verisini konsola yazdırarak kontrol edelim
            console.log("Güncellenmiş Favoriler:", updatedFavorites);
    
            // updatedFavorites bir dizi mi? Eğer dizi ise productId'nin içerip içermediğini kontrol edelim
            if (Array.isArray(updatedFavorites)) {
                // Favori durumu kontrolü
                if (updatedFavorites.includes(productId)) {
                    setIsFavorite(true); // Favoriye eklenmişse, buton kırmızıya döner
                } else {
                    setIsFavorite(false); // Favoriden çıkarılmışsa, buton gri olur
                }
            } else {
                console.error("Favori verisi geçerli bir dizi değil:", updatedFavorites);
            }
        } catch (error) {
            console.error('Favori işlemi başarısız:', error.response || error.message);
        }
    };
    

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="product-page">
            <button className="backbutton" onClick={() => navigate(-1)}>
                &#11164; Geri
            </button>
            {product.map((product) => (
                <div key={product.id}>
                    <img
                        src={`${product.img_url}`}
                        alt={product.product_name}
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginRight: '8px' }}>{product.product_name}</h2>
                        <button
                            className="favorite-button"
                            onClick={handleFavoriteClick}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '24px',
                                // color: isFavorite ? 'red' : 'gray',
                            }}
                            aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <p>Fiyat: {product.lowest_price} TL</p>
                    <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                </div>
            ))}
            <Reviews productId={productId} isLoggedIn={isLoggedIn} userId={userId} />
        </div>
    );
};

export default ProductPage;