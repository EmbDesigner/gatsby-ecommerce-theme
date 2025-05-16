import React, { useState } from 'react'
import { Link } from 'gatsby'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from 'react-modal'
import Layout from '../components/layout' // Assuming you have a layout component
import SEO from '../components/seo' // For Gatsby's SEO component

// Sample data - Replace with your GraphQL query
const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  slug: `product-${i+1}`,
  name: `Product ${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`,
  image: `https://picsum.photos/200/300?random=${i}`,
  description: `Product ${i+1} description.`
}))

const IndexPage = () => {
  const [items, setItems] = useState(products.slice(0, 10))
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(products.slice(items.length, items.length + 5)))
    }, 1000)
  }

  // Set app element for react-modal accessibility
  if (typeof window !== 'undefined') {
    Modal.setAppElement('#___gatsby')
  }

  return (
    <Layout>
      <SEO title="Home" />
      
      <div className="container mx-auto px-4 py-8">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={items.length < products.length}
          loader={<div className="text-center py-8">Loading...</div>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div 
                key={product.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product)
                  setModalIsOpen(true)
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
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
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-10">
              <button 
                onClick={() => setModalIsOpen(false)}
                className="float-right text-xl font-bold"
              >
                &times;
              </button>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="text-xl my-2">{selectedProduct.price}</p>
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              <Link
                to={`/products/${selectedProduct.slug}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  )
}

export default IndexPage

// Add to your global CSS file (e.g., src/styles/global.css)
/*
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  max-width: 90%;
  width: 500px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
}
*/
