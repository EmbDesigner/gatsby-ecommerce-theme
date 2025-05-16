import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';

// Sample product data (replace with your API/GraphQL query)
const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`,
  image: `https://picsum.photos/200/300?random=${i}`,
  description: `This is a detailed description for Product ${i + 1}.`
}));

export default function IndexPage() {
  const [items, setItems] = useState(products.slice(0, 10));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(products.slice(items.length, items.length + 5)));
    }, 1000);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  return (
    <div className="container">
      <h1>E-Commerce Store</h1>
      
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < products.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="product-grid">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => openModal(product)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProduct && (
          <div className="modal-content">
            <button onClick={() => setModalIsOpen(false)}>×</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.price}</p>
            <p>{selectedProduct.description}</p>
            <button>Add to Cart</button>
          </div>
        )}
      </Modal>

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 15px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .product-card:hover { transform: scale(1.03); }
        .modal { background: white; padding: 20px; max-width: 600px; margin: auto; }
        .overlay { background: rgba(0, 0, 0, 0.75); }
      `}</style>
    </div>
  );
}
