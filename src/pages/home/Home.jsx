

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Footer from "../../components/Footer.jsx";
import Wishlist from '../wishlist/Wishlist.jsx';  

  // Import Wishlist component

export default function Home() {
    const navigate = useNavigate();
    const [propertyList, setPropertyList] = useState();
    const [categoryData, setCategoryData] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);  // State to toggle Wishlist modal visibility

    const getAllCategory = async () => {
        try {
            let result = await axios.get('/category', {
                params: {
                    search: "",
                    page: 1,
                    size: 50
                }
            });
            if (result.data.success) {
                setCategoryData(result?.data?.data ? result?.data?.data : []);
            } else toast.error('Failed');
        } catch (ERR) {
            console.log(ERR);
            toast.error(ERR?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllProperties = async () => {
        try {
            let result = await axios.get('/property/all', {
                params: {
                    search: "",
                    page: 1,
                    size: 8,
                    price: -1,
                }
            });

            if (result.data.success) {
                setPropertyList(result?.data?.data ? result?.data?.data : []);
            } else toast.error('Failed to fetch properties');
        } catch (ERR) {
            console.log(ERR);
            toast.error(ERR?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getAllProperties();
    }, []);

    const stats = [
        { id: 1, name: 'Wide Range of Properties', img: 'src/assets/images/widerange.jpg' },
        { id: 2, name: 'Luxury Homes for You', img: 'src/assets/images/luxuryhouse.jpg' },
        { id: 3, name: 'Affordable Housing', img: 'src/assets/images/affordhouse.jpg' },
    ];

    const toggleWishlist = () => {
        setShowWishlist(!showWishlist);
    };

    return (
        <div className="bg-white dark:bg-black dark:text-white">
            {/* Main Content */}
            <div className="relative grid place-items-center w-full h-screen -mt-20">
                <div className="absolute top-0 right-0 z-0 w-full h-full bg-contain bg-white">
                    <img
                        className="object-cover w-full ml-auto h-screen rounded shadow-lg lg:rounded-none lg:shadow-none transition-transform duration-1000 transform hover:scale-110"
                        src="src/assets/images/homepic1.jpg"
                        alt="real estate page pic"
                    />
                    <div className="absolute top-0 bg-black bg-opacity-65 h-full w-full from-black to-transparent" />
                </div>
                <div className="relative mt-10 flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-2xl">
                    <div className="my-20 w-full lg:max-w-2xl lg:pr-5 text-white rounded-xl shadow p-10 animate__animated animate__fadeIn">
                        <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-7xl sm:leading-none">
                            Find Your Dream Home Today!
                        </h2>
                        <p className="pr-5 mb-5 text-3xl md:text-3xl mt-3">
                            Your Perfect Property Awaits
                        </p>
                        <div className="flex mt-10 md:text-3xl items-center">
                            <a
                                href="/property"
                                className="border-l-4 flex items-center gap-5 text-2xl border-green-600 pl-5 focus:shadow-outline focus:outline-none transition-transform duration-300 hover:translate-x-2"
                            >
                                See Our Listings <FaArrowRight size={22} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wishlist Icon Button */}
            <div
                onClick={toggleWishlist}
                className="fixed bottom-10 right-10 bg-red-600 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-red-700 transition-all"
            >
                <FaHeart size={24} />
            </div>

            {/* Wishlist Modal */}
            {showWishlist && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-black rounded-lg w-full sm:w-2/3 p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Wishlist</h2>
                            <button onClick={toggleWishlist} className="text-lg text-gray-600 dark:text-white">
                                Close
                            </button>
                        </div>
                        <Wishlist /> {/* Wishlist content here */}
                    </div>
                </div>
            )}

            {/* Recommended Properties Section */}
            <div className="bg-white dark:bg-black dark:text-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Recommended Properties</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {propertyList?.map((property, index) => (
                            <Link to={`/property/${property.sku}`} key={index} className="group relative transform transition-all duration-500 hover:scale-105 hover:translate-y-3" role="button">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`${import.meta.env.VITE_APP_BASE_URI}${property.images[0]}`}
                                        alt={property.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-500 transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700 dark:text-white capitalize">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {property.name}
                                        </h3>
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-white">Rs. {property.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
