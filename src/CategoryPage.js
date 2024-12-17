import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import './styles/CategoryPage.css'

const CategoryPage = () => {
    const { category } = useParams(); // Kategori adını alıyoruz
    const [subcategories, setSubcategories] = useState([]);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null); // Açık alt kategori
    const [attributes, setAttributes] = useState({}); // Her alt kategori için attribute'ları tutar

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/subcategories/${category}`);
                setSubcategories(response.data);
            } catch (error) {
                console.error('Alt kategoriler alınamadı:', error);
            }
        };
        fetchSubcategories();
    }, [category]);

    const handleSubcategoryClick = async (subcategoryId) => {
        if (expandedSubcategory === subcategoryId) {
            // Eğer tıklanan zaten açık olan alt kategori ise kapat
            setExpandedSubcategory(null);
            return;
        }

        // Yeni alt kategori tıklanmışsa, attribute'ları çek
        try {
            const response = await axios.get(`http://localhost:5000/api/attributes/${subcategoryId}`);
            setAttributes((prev) => ({ ...prev, [subcategoryId]: response.data }));
        } catch (error) {
            console.error('Attribute verileri alınamadı:', error);
        }

        setExpandedSubcategory(subcategoryId); // Yeni alt kategoriyi genişlet
    };

    const sidebarContent = (
        <>
            <h3>{category} Alt Kategorileri</h3>
            <ul>
                {subcategories.map((subcategory) => (
                    <li key={subcategory.subcategory_id}>
                        <div
                            onClick={() => handleSubcategoryClick(subcategory.subcategory_id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {subcategory.subcategory_name}
                        </div>
                        {expandedSubcategory === subcategory.subcategory_id && (
                            <ul style={{ paddingLeft: '20px', color: '#555' }}>
                                {attributes[subcategory.subcategory_id]?.map((attr) => (
                                    <li key={attr.attribute_id}>{attr.attribute_name}</li>
                                )) || <li>Yükleniyor...</li>}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <Layout
            sidebarContent={sidebarContent}
            isBackButtonVisible={true} // Geri Dön tuşu görünür
            backButtonPath="/" // Ana sayfaya yönlendirme
        >
            <h1>Alt Kategoriler</h1>
        </Layout>

    );
};

export default CategoryPage;
