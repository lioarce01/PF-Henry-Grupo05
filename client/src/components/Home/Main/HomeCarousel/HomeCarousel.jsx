import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Spinner from "../../../Spinner/Spinner";
import { useGetShelterByAnimalMutation, useGetSheltersQuery, useTopFiveSheltersQuery } from "../../../../redux/api/shelters"
import { FreeMode, Autoplay } from "swiper";
import CarouselCard from './CarouselCard'
import { useDispatch, useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../../../redux/api/users";
import { carouselSheltersAction } from "../../../../redux/slices/manageShelters/actions";

const HomeCarousel = () => {
    const { carousel, animals } = useSelector(state => state.manageShelters)
    const { isAuth, userDetail } = useSelector(state => state.localStorage.userState)
    const { data: shelters, isLoading, refetch } = useGetSheltersQuery({ name: "", enabled: true })
    const { data: topShelters, refetchTop } = useTopFiveSheltersQuery(10)
    const [getShelterByAnimal, { data: animalShelter }] = useGetShelterByAnimalMutation()
    const [showShelters, setShowShelters] = useState(shelters)
    const { data: gotUser, refetch: userRefetch } = useGetUserByIdQuery(userDetail?.id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (carousel === 'following') {
            userRefetch()
            setShowShelters(gotUser?.following)}
        else if (carousel === 'trending') setShowShelters(topShelters)
        else if (carousel === "animals") {
            if (animals.length > 0) {
                getShelterByAnimal(animals).unwrap()
                    .then(res => setShowShelters(res))
            } else dispatch(carouselSheltersAction("all"))
        }
        else setShowShelters(shelters)

    }, [carousel, animals, shelters, gotUser])

    if (isLoading) return (<div className=""><Spinner /></div>)
    if (!showShelters?.length) return (
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
                        <CarouselCard id={s?.id} image={s?.profilePic} name={s?.name} city={s?.city} authorId={s?.authorId}
                            budget={s?.budget} listAnimals={s?.listAnimals} profilePic={s?.author?.profilePic} />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default HomeCarousel