import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Card, Spinner, Container, Modal } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';
import ProductsText from './ProductsText';
import './Tabs.css';

// URL Tanımları
const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { locale } = useLanguage();

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryRes, productRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/categories?locale=${locale}`),
                    axios.get(`${API_BASE_URL}/products?populate=*&locale=${locale}`),
                ]);

                setCategories(categoryRes.data.data || []);
                setProducts(productRes.data.data || []);

                if ((categoryRes.data.data || []).length > 0) {
                    setActiveKey(categoryRes.data.data[0].slug);
                }
            } catch (err) {
                console.error("Veriler alınamadı:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, [locale]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Yükleniyor...</p>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <ProductsText />
            <Tabs
                id="product-tabs"
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
                className="mb-5 product-tabs justify-content-center"
                variant="tabs"
                transition={true}
                style={{ border: "none", textTransform: "uppercase" }}
            >
                {categories.map((category) => (
                    <Tab
                        style={{ textTransform: "uppercase" }}
                        eventKey={category.slug}
                        title={category.name}
                        key={category.id}
                    >
                        <div className="row fade-in">
                            {products
                                .filter(
                                    (product) =>
                                        product.category &&
                                        product.category.slug === category.slug
                                )
                                .map((product) => {
                                    const imageUrl = product.image?.url ? `${BASE_URL}${product.image.url}` : "";
                                    return (
                                        <div className="col-md-4 mb-4" key={product.id}>
                                            <Card
                                                className="h-100 shadow-sm border-0 rounded-4 product-card"
                                                onClick={() => setSelectedProduct(product)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {imageUrl && (
                                                    <Card.Img
                                                        variant="top"
                                                        src={imageUrl}
                                                        alt={product.title}
                                                        style={{
                                                            height: '220px',
                                                            objectFit: 'cover',
                                                            borderTopLeftRadius: '1rem',
                                                            borderTopRightRadius: '1rem',
                                                        }}
                                                    />
                                                )}
                                                <Card.Body className="p-4">
                                                    <Card.Title className="text-primary fw-semibold fs-5">
                                                        {product.title}
                                                    </Card.Title>
                                                    <Card.Text className="text-muted">
                                                        {product.description}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    );
                                })}
                        </div>
                    </Tab>
                ))}
            </Tabs>

            {/* Modal */}
            <Modal
                show={!!selectedProduct}
                onHide={() => setSelectedProduct(null)}
                centered
                backdropClassName="blur-backdrop"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    {selectedProduct?.image?.url && (
                        <img
                            src={`${BASE_URL}${selectedProduct.image.url}`}
                            alt={selectedProduct.title}
                            className="img-fluid rounded mb-3"
                        />
                    )}
                    <p>{selectedProduct?.modalText}</p>
                </Modal.Body>
            </Modal>

            {/* CSS */}
            <style jsx="true">{`
                .product-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
                }

                .product-tabs .nav-link {
                    border: none;
                    border-bottom: 3px solid transparent;
                    color: #5b9bd5;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    padding: 10px 20px;
                    font-size: 1rem;
                    border-radius: 0;
                }

                .product-tabs .nav-link:hover {
                    color: #4a8ac2;
                }

                .product-tabs .nav-link.active {
                    border-color: #5b9bd5;
                    background-color: transparent !important;
                    color: #5b9bd5;
                }

                .fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .blur-backdrop {
                    backdrop-filter: blur(50px);
                    background-color: rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </Container>
    );
};

export default Products;
