import Posts from "../Posts"
import PostFilters from "../PostFilters"
import { TbMap2 } from 'react-icons/tb'
import { useSelector } from "react-redux"
import ProfileFooter from "./ProfileFooter"
import MapView from "../../Maps/MapView/MapView"

const ProfileBottom = ({ details, setIsOpen }) => {
    const { userDetail } = useSelector(state => state.localStorage.userState);

    return (
        <div className="flex flex-row mt-[10px]">
            <div className="w-[55%] xsm:hidden lg:block">
                <div className="flex flex-row">

                    <h2 className="text-2xl font-semibold text-[#838788] dark:text-[#b3b8b9]">News & Updates</h2>

                    {details?.posts.length ? (
                        <div className={`flex items-center justify-end text-xs sm:text-lg ml-auto ${(details?.posts > 1 || details?.author?.id === userDetail?.id) ? "mr-[10px]" : "mr-[55px]"}`}>
                            <PostFilters />
                        </div>
                    ) : undefined}

                    {details?.author?.id === userDetail?.id && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-[#FF7272] w-[120px] font-semibold text-white rounded-full transition duration-300
                            hover:bg-[#e46363]">
                            Create Post
                        </button>
                    )}

                </div>


                <Posts name={details?.name} id={details?.id} />
            </div>

            <div className="lg:ml-[80px] md:w-full lg:w-[45%] flex flex-col">
                <div className="flex flex-row">
                    <TbMap2 className="text-3xl mt-1 text-[#838788] dark:text-[#b3b8b9]" />
                    <h2 className="text-2xl font-semibold ml-[10px] text-[#838788] dark:text-[#b3b8b9]">Location</h2>
                </div>

                <div className="mt-[20px] w-full">
                    {details && <MapView name={details?.name} lat={details?.lat} lon={details?.lon} id={details?.id} author={details?.author} />}
                </div>

                <div className={`lg:hidden ${( userDetail?.Shelter && userDetail?.Shelter[0]?.id === details?.id) && 'mt-[80px]'}`}>
                    <div className="flex flex-row">

                        <h2 className="text-2xl font-semibold text-[#838788] dark:text-[#b3b8b9]">News & Updates</h2>

                        {details?.posts.length ? (
                            <div className={`flex items-center justify-end text-xs sm:text-lg ml-auto ${(details?.posts > 1 || details?.author?.id === userDetail?.id) ? "mr-[10px]" : "mr-[55px]"}`}>
                                <PostFilters />
                            </div>
                        ) : undefined}

                        {details?.author?.id === userDetail?.id && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-[#FF7272] w-[120px] font-semibold text-white rounded-full transition duration-300
                            hover:bg-[#e46363]">
                                Create Post
                            </button>
                        )}

                    </div>

                    <div className="xsm:flex lg:hidden">
                        <Posts name={details?.name} id={details?.id} />
                    </div>
                </div>

                <ProfileFooter id={details?.id} />
            </div>
        </div>
    )
}

export default ProfileBottom