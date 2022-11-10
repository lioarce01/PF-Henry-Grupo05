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
import {getSheltersTopFiveAction} from '../../../redux/reducers/dataBack/manageShelters/manageSheltersActions'
import { selectShelter } from "../../../redux/reducers/dataBack/manageShelters/manageSheltersSlice";
import { selectLoading } from "../../../redux/reducers/dataBack/loading/loadingSlice";


const Carousel = () => {
    const distpatch = useDispatch()
    const { topShelters } = useSelector(selectShelter)
    const loading = useSelector(selectLoading)

    useEffect(() => {
        distpatch(getSheltersTopFiveAction())
    },[distpatch])

    if(loading) return (<div className="text-center">Loading...</div>)
    if(!topShelters) return 

  return (
    <div className="w-3/4 h-fit    mx-auto rounded ">
      <h2 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-4xl text-center">
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

        
        className="mySwiper max-h-52 px-2  border border-gray-300  rounded"
      >
        
        {topShelters.length > 0 && topShelters.map((ong,index) => <SwiperSlide  key={index} ><p>#{index + 1}</p><Card id={ong.id} image={ong.profilePic} name={ong.name}/></SwiperSlide>)}
       
      </Swiper>
    </div>
  );
};

export default Carousel;
