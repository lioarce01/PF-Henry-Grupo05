import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Spinner from "../../../Spinner/Spinner";
import { useGetSheltersQuery, useTopFiveSheltersQuery } from "../../../../redux/api/shelters"
import { FreeMode, Autoplay } from "swiper";
import CarouselCard from './CarouselCard'
import { useSelector } from "react-redux";

const HomeCarousel = () => {
    const { carousel } = useSelector(state => state.manageShelters)
    const { userDetail } = useSelector(state => state.localStorage.userState)
    const { data: shelters, isLoading, refetch } = useGetSheltersQuery({name: "", enabled: true})
    const { data: topShelters, refetchTop } = useTopFiveSheltersQuery(10)

    const [showShelters, setShowShelters] = useState(shelters)
    
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        setShowShelters(shelters)
    }, [shelters])

    useEffect(() => {
        if (carousel === 'following') setShowShelters(userDetail?.following)
        else if (carousel === 'trending')  setShowShelters(topShelters)
        else setShowShelters(shelters)
    }, [carousel])

    if (isLoading) return (<div className=""><Spinner /></div>)

    return (
        <div className="">
            <Swiper
                loop={true}
                slidesPerView={1}
                spaceBetween={0}
                freeMode={true}
                direction={"horizontal"}
                modules={[FreeMode, Autoplay]}
                className="h-[380px]"

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
                    640: {
                        width: 640,
                        slidesPerView: 2,
                        direction: "horizontal"
                    },
                    320: {
                        width: 320,
                        slidesPerView: 1,
                        direction: "horizontal"
                    }
                }}>

                    {showShelters?.length > 0 && showShelters?.map((s, index) => 
                    <SwiperSlide key={index} >
                        <CarouselCard id={s?.id} image={s?.profilePic} name={s?.name} goal={s?.goal} authorId={s?.authorId}
                                      budget={s?.budget} listAnimals={s?.listAnimals} profilePic={s?.author?.profilePic}/>
                    </SwiperSlide>)}

            </Swiper>
        </div>
    )
}

export default HomeCarousel