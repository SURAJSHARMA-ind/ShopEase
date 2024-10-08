import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { CiShoppingCart } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
const Skeleton = ({ className }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`}></div>;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);//skeleton ui
 
  const fetchData = async () => {
    try {
      const [productRes, categoryRes] = await Promise.all([
        fetch('http://localhost:3000/products'),
        fetch('http://localhost:3000/products')
      ]);

      const [productData, categoryData] = await Promise.all([
        productRes.json(),
        categoryRes.json()
      ]);

      setProducts(productData);
      setCategories(categoryData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Ensure loading is turned off even if an error occurs
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  const addToCartHandler = (e) => {
    console.log(e);

  }
  return (
    <div className="home-container bg-gray-900 text-white">
      <section className="hero-section bg-cover bg-center py-20 px-8">
        <Slider {...settings}>

          <div>
            <img
              src="https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Slide 1"
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.stockcake.com/public/6/5/e/65e3e020-0749-4e38-b179-9fe3986077ec_large/stylish-black-sneakers-stockcake.jpg"
              alt="Slide 2"
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.stockcake.com/public/6/f/a/6fa67299-9ff6-4dc7-9d90-4bbfed07f0b7_large/stylish-high-top-sneakers-stockcake.jpg"
              alt="Slide 3"
              className="w-full h-96 object-cover"
            />
          </div>
        </Slider>
        {/* use for transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="hero-content text-center mt-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-lg md:text-xl mb-8">Discover the best deals on your favorite products!</p>
          <button className="hover:from-orange-500 hover:bg-purple-600 bg-gradient-to-r from-teal-400 to-blue-500 py-2 px-4 rounded">
            <a href='#featured'>Shop Now</a>
          </button>
        </motion.div>
      </section>


      <section
        id='featured' className="featured-products bg-gray-800 py-16 px-8">
        <h2 className="text-3xl mt-2 p-3 font-semibold mb-6 ] text-center text-gray-300">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-card bg-gray-800 p-4 shadow-lg rounded flex flex-col">
                <Skeleton className="w-full h-48 mb-4 rounded" />
                <Skeleton className="h-6 mb-2" />
                <Skeleton className="h-4 mb-4" />
                <Skeleton className="h-8 w-1/3 mt-auto" />
              </div>
            ))
          ) : (
            products.map((product) => {
              if (product.id < 20) {
                return (
                  <div key={product.id} className="product-card bg-gray-700 p-4 shadow-lg rounded flex flex-col">
                    {product.images.map((img, index) => {
                      // img.replace(/&quot;/g, '').replace(/^\[|\]$/g, '');
                      if (index === 0)
                        return (
                          <img
                            key={index}
                            src={img}
                            alt="Product image"
                            className="w-full h-48 object-cover mb-4 rounded"
                          />
                        );
                    })}
                    <h3 className="text-lg font-semibold mb-2 flex-grow text-white">{product.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{`$${product.price}`}</p>
                    <div className="mt-auto">
                      <CiShoppingCart className='text-4xl inline-block rounded w-1/4 hover:from-orange-500 hover:bg-purple-600 bg-gradient-to-r from-teal-400 to-blue-500' onClick={() => { addToCartHandler(product.id) }} />
                      <Link to={'/productDetail'}>
                      <FaExternalLinkAlt className='text-4xl inline-block ml-3 py-2 rounded w-1/4 hover:from-green-500 hover:bg-blue-600 bg-gradient-to-r from-blue-400 to-blue-500' />
                      </Link>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </section>

      <section className="categories-section py-16 px-8 bg-gray-800">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-300">Shop by Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="category-card bg-gray-700 p-4 shadow-lg rounded text-center">
                <Skeleton className="w-full h-48 mb-4 rounded" />
                <Skeleton className="h-6" />
              </div>
            ))
          ) : (
            categories.map((category) => {
              if (category.id < 6 && category.id != 3)
                return (
                  <div key={category.id} className="category-card bg-gray-700 p-4 shadow-lg rounded text-center">
                    <img src={category.image} alt="Category Name" className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-lg font-semibold mb-2 text-white">{category.name}</h3>
                  </div>
                );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
