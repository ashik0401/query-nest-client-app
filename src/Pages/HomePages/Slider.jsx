import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

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
                <p className="text-center">Loading...</p>
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
                                <div className="absolute flex flex-col items-center justify-center inset-0 px-6 rounded-xl transition-all duration-500 md:pl-40 md:space-y-3">
                                    <h2 className="md:text-3xl font-bold text-sm text-primary">{item.title}</h2>
                                    <p className="md:text-xl md:font-medium">{item.subtitle}</p>
                                    <div></div>
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
