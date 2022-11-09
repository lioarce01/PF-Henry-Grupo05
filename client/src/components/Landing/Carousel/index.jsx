import React, { useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { FreeMode, Autoplay } from "swiper";
import Card from './Card'
import { useDispatch, useSelector } from "react-redux";
import { getOngsTrendingAction } from "../../../redux/reducers/dataBack/manageOngs/manageOngsActions";


const Carousel = () => {
    const distpatch = useDispatch()
    const ongs = useSelector(state => state.manageOngs.ongsTrending)

    useEffect(() => {
        distpatch(getOngsTrendingAction())
    },[distpatch])

  return (
    <div className="w-3/4 h-fit bg-gray-200 px-10 py-10 rounded shadow-lg">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        freeMode={true}
        direction={"horizontal"}
        modules={[FreeMode, Autoplay]}
        
        breakpoints={{
            1440: {
                width: 1440,
                slidesPerView: 4
            },
            1024: {
                width: 1024,
                slidesPerView: 3
            },
            768: {
                width: 768,
                slidesPerView: 2
            },
            320: {
                width: 320,
                slidesPerView: 1,
                direction: "horizontal"
                
            }
        }}

        
        className="mySwiper max-h-52"
      >
        
        {ongs.length > 0 && ongs.slice(0,5).map((ong,index) => <SwiperSlide  key={index} ><p>#{index + 1}</p><Card id={ong.id} image={ong.image} name={ong.nombre}/></SwiperSlide>)}
       
      </Swiper>
    </div>
  );
};

export default Carousel;
