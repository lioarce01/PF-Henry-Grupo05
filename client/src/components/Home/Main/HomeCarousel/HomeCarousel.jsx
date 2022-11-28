import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Spinner from "../../../Spinner/Spinner";
import { useGetShelterByAnimalMutation, useGetSheltersQuery, useTopFiveSheltersQuery } from "../../../../redux/api/shelters"
import { FreeMode, Autoplay } from "swiper";
import CarouselCard from './CarouselCard'
import { useSelector } from "react-redux";

const HomeCarousel = () => {
    const { carousel, animals } = useSelector(state => state.manageShelters)
    const { isAuth, userDetail } = useSelector(state => state.localStorage.userState)
    const { data: shelters, isLoading, refetch } = useGetSheltersQuery({name: "", enabled: true})
    const { data: topShelters, refetchTop } = useTopFiveSheltersQuery(10)
    const [getShelterByAnimal, {data: animalShelter}] = useGetShelterByAnimalMutation() 
    const [showShelters, setShowShelters] = useState(shelters)
    console.log(userDetail, animalShelter)
    
    useEffect(() => {
        refetch()

    }, [])

    useEffect(() => {
        setShowShelters(shelters)
    }, [shelters])

    useEffect(() => {
        if (carousel === 'following') setShowShelters(userDetail?.following)
        else if (carousel === 'trending')  setShowShelters(topShelters)
        else if(carousel === "animals") {
            if(animals.length > 0) {
                getShelterByAnimal(animals).unwrap()
                    .then(res => setShowShelters(res))
            } else setShowShelters(shelters)
        }
        else setShowShelters(shelters)
        
    }, [carousel, animals])

    if (isLoading) return (<div className=""><Spinner /></div>)
    if (! showShelters?.length) return (
    <div className="w-full py-[40px]">
        <h1 className="text-center font-bold text-[#FF7272]">{isAuth ? "You are not following any shelters." : "You are not logged in!"}</h1>
    </div>)

    return (
        <div className="">
            <Swiper
          
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