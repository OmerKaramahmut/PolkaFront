import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Card, Spinner, Container, Modal } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';
import ProductsText from './ProductsText';
import './Tabs.css'; // CSS dosyasını içe aktar



const API_BASE_URL = import.meta.env.VITE_API_URL;
const Products = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { locale } = useLanguage(); // Locale bilgisini alıyoruz (Türkçe veya İngilizce)

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryRes, productRes] = await Promise.all([
                    // Dil parametresi ile API'den kategori ve ürünleri alıyoruz
                    axios.get(`${API_BASE_URL}/categories?locale=${locale}`),
                    axios.get(`${API_BASE_URL}/products?populate=*&locale=${locale}`),
                ]);

                const categoryData = categoryRes.data.data || [];
                const productData = productRes.data.data || [];

                setCategories(categoryData);
                setProducts(productData);

                if (categoryData.length > 0) {
                    setActiveKey(categoryData[0].slug);
                }
            } catch (err) {
                console.error("Veriler alınamadı:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, [locale]); // Locale değiştiğinde yeniden veri çek

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
                    <Tab style={{ textTransform: "uppercase" }} eventKey={category.slug} title={category.name} key={category.id}>
                        <div className="row fade-in">
                            {products
                                .filter(
                                    (product) =>
                                        product.category &&
                                        product.category.slug === category.slug
                                )
                                .map((product) => (
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <Card
                                            className="h-100 shadow-sm border-0 rounded-4 product-card"
                                            onClick={() => setSelectedProduct(product)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {product.image?.url && (
                                                <Card.Img
                                                    variant="top"
                                                    src={`${API_BASE_URL}${typeof product.image === 'string' ? product.image : product.image.url || ''}`}
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
                                                <Card.Title style={{ transform: "translateX(0%)" }} className="text-primary fw-semibold fs-5">
                                                    {product.title}
                                                </Card.Title>
                                                <Card.Text className="text-muted">
                                                    {product.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
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
                    <Modal.Title style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >{selectedProduct?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    {selectedProduct?.image?.url && (
                        <img
                            src={`${API_BASE_URL}${selectedProduct.image.url}`}
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
