import React, { useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { FreeMode, Autoplay } from "swiper";
import Card from './Card'
import { useTopFiveSheltersQuery } from "../../../redux/api/shelters"
import Spinner from "../../Spinner/Spinner";


const Carousel = () => {
  const { data: topShelters, isLoading, error, isSuccess, refetch } = useTopFiveSheltersQuery();

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading) return (<div className=""><Spinner/></div>)
  if (! topShelters) return

  return (
    <div className="w-[80%] h-fit mx-auto rounded ">
      <h2 className="mb-10 font-bold text-[#000] md:text-7xl lg:text-5xl text-center">
        Trending
      </h2>
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

        className="mySwiper h-[400px] px-2">


        {topShelters.length > 0 && topShelters.map((ong, index) => <SwiperSlide key={index} ><Card id={ong.id} image={ong.profilePic} name={ong.name} desc={ong.description} index={index+1}/></SwiperSlide>)}

      </Swiper>
    </div>
  );
};

export default Carousel;
