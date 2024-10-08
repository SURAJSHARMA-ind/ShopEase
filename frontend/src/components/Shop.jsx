import {React,useState,useEffect} from 'react'
import { fetchApi } from '../Services/Api';
const Skeleton = ({ className }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`}></div>;
};

function Shop() {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);//skeleton ui

    const loadProduct = async () => {
      try {
        const productData = await fetchApi();
        setproducts(productData);
        setLoading(false);
      } catch (error) {
        console.error(`error is ${error}`);
      }
    };
  
    useEffect(() => {
      loadProduct();
    }, []);
  return (
    <section
    id='featured' className="featured-products bg-gray-800 py-16 px-8">
    <h2 className="text-3xl mt-2 p-3 font-semibold mb-6 ] text-center text-gray-300"> Products</h2>
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
           {
            return (
              <div key={product.id} className="product-card bg-gray-700 p-4 shadow-lg rounded flex flex-col">
                {product.images.map((img, index) => {
                  img.replace(/&quot;/g, '').replace(/^\[|\]$/g, '');
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
                  <button className="py-2 rounded w-1/3 hover:from-orange-500 hover:bg-purple-600 bg-gradient-to-r from-teal-400 to-blue-500">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  </section>
  )
}

export default Shop
