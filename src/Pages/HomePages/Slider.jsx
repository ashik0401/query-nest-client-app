import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';

const Slider = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Slider.json')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='lg:pb-10'>
            {loading ? (
                <p className="text-center"><span class="loading loading-ring loading-xs"></span>
                </p>
            ) : (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper w-full  max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh] "
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="relative w-full">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full  max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh] object-cover "
                                />
                                <div className="absolute flex flex-col items-center justify-center inset-0 px-6 rounded-xl transition-all duration-500 md:pl-40 md:space-y-3 bg-black/30 text-white">
                                    <h2 className="md:text-3xl font-bold text-sm ">{item.title}</h2>
                                    <p className="md:text-xl md:font-medium text-center">{item.description}</p>
                                    <div>
                                        <Link to='/queries' className="relative inline-block text-lg group">
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-base-300 rounded-lg group-hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-base-300 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">See more</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-300 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Slider;
