import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs"
import { useGetSheltersQuery } from "../../../redux/api/shelters"
import { BsFillPersonFill } from "react-icons/bs"
import { FaWindowClose } from 'react-icons/fa'
import { FaComments } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ONGFilters from './ONGFilters'
import { useState } from "react"

const ModalShelters = ({ setOpen, search }) => {
    const { data: allShelters } = useGetSheltersQuery({ name: "", enabled: true })
    const [shelters, setShelters] = useState(allShelters)

    // handles this filter bar expansion state
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded(!expanded)

    const closeModal = () => setOpen(false)

    return (
        <div className="flex items-center z-50 fixed right-0 bottom-[0px] w-screen h-screen backdrop-blur-sm bg-[#161616c5]">
            <div className="flex flex-row mx-auto bg-[#EFF0F3] rounded-[20px] xl:w-[1500px] xl:h-[900px] xsm:w-screen xsm:h-screen xsm:rounded-none">

                <div className={`bg-white xl:h-full xl:w-[25%] flex rounded-l-[20px] ${!expanded ? "xsm:w-0 xsm:flex" : "xsm:fixed xsm:flex xsm:w-screen xsm:h-full md:w-[40%]"} transition-all duration-300`}>
                    <div className={`ml-[30px] ${!expanded ? "xsm:hidden xl:flex" : "xsm:flex"}`}>
                        <ONGFilters setShelters={setShelters} search={search} />
                    </div>
                </div>

                <div className="h-full xl:w-[75%] xsm:w-screen flex flex-col">
                    <div className="flex">
                        <button className='w-full'>
                            <FaWindowClose className="text-[#FF7272] hover:text-[#e66363] float-right w-[30px] h-[30px] mt-[10px] mr-[10px]" onClick={closeModal} />
                        </button>
                    </div>


                    <div className={`flex flex-row sm:mx-auto xsm:w-screen xl:w-auto mt-[20px] pb-[40px] mb-[40px] xsm:mb-0 flex-wrap overflow-x-hidden ${!shelters?.length && "h-full"}
                    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#FF7272] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md`}>
                        <div className={`flex w-[90%] mx-auto ${!shelters?.length && "h-full"}`}>
                            <div className="flex flex-row flex-wrap mx-auto">
                                {shelters?.length ? (
                                    shelters?.map(s => {
                                        return (
                                            <Link key={s.id} to={`/${s.id}/profile`} className="w-fit mx-auto">
                                                <div className="xsm:w-[300px] md:w-[400px] xl:w-[420px] bg-white mt-[20px] rounded-[40px] pl-[20px] group 
                                            pt-[20px] pr-[20px] pb-[15px] shadow-[6px_16px_30px_-27px_rgba(133,133,133,1)]
                                            hover:bg-gradient-to-br from-white to-[#ececec] xsm:h-[200px] md:h-auto">
                                                    <div className="flex flex-row">
                                                        <img src={s.profilePic} className="object-cover w-[120px] h-[120px] rounded-[25px] 
                                                    shadow-[0px_12px_10px_-6px_rgba(133,133,133,0.8)]" />

                                                        <div className="flex-col items-start mt-[10px] ml-[25px] xsm:hidden md:flex">
                                                            <h1 className="flex flex-col leading-5 font-[700] text-[#838788] group-hover:text-[#5e6061]">{s.name}</h1>
                                                            <p className="flex flex-col text-[#FF7272]">{s.city}</p>
                                                            <p className="flex flex-row w-[250px] mt-[10px] font-semibold 
                                                        text-[#ACB1B2] text-[0.9rem] group-hover:text-[#838788]">
                                                                {s.description.length > 61 ? (s.description.slice(0, 61) + "...") : (s.description)}</p>
                                                        </div>

                                                        <div className="flex-col items-start mt-[10px] ml-[25px] xsm:flex md:hidden">
                                                            <h1 className="flex flex-col leading-5 font-[700] text-[#838788] group-hover:text-[#5e6061] xsm:text-[0.9rem]">
                                                                {s.name.length > 27 ? (s.name.slice(0, 27) + "...") : (s.name)}</h1>
                                                            <p className="flex flex-col text-[#FF7272] xsm:text-[0.9rem]">
                                                                {s.city.length > 16 ? (s.city.slice(0, 16) + "...") : (s.city)}</p>
                                                            <p className="flex flex-row w-[120px] mt-[10px] font-semibold 
                                                        text-[#ACB1B2] text-[0.9rem] group-hover:text-[#838788]">
                                                                {s.description.length > 20 ? (s.description.slice(0, 20) + "...") : (s.description)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex w-full justify-end xsm:mt-[20px] md:mt-0">
                                                        <div className="flex flex-row mr-[15px]">
                                                            <p className="flex mr-[2px] text-[#FF7272]">{s.followers?.length}</p>
                                                            <BsFillPersonFill className="text-[#FF7272] flex mt-[5px]" />
                                                        </div>

                                                        <div className="flex flex-row">
                                                            <p className="flex mr-[4px] text-[#FF7272]">{s.posts?.length}</p>
                                                            <FaComments className="text-[#FF7272] flex mt-[5px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <div className="w-[300px] h-full flex flex-col items-center justify-center">
                                        <h1 className="text-center text-[2rem] text-[#666768]">No shelters found.</h1>
                                        <span className="mx-auto flex w-fit text-[2rem]">😢😢</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* expand nav button: only shows on xsm */}
            {!expanded && <div className="w-fit xsm:flex mx-auto absolute top-[20px] left-[20px] xl:hidden">
                <button onClick={toggleExpanded} className="bg-[#FF7272] p-[10px] rounded-full z-50">
                    <BsChevronBarRight className="text-3xl text-white" />
                </button>
            </div>}

            {/* retract nav button: only shows on xsm */}
            {expanded && <div className="w-fit xsm:flex mx-auto absolute top-[20px] left-[20px] xl:hidden">
                <button onClick={toggleExpanded} className="bg-[#FF7272] p-[10px] rounded-full z-50">
                    <BsChevronBarLeft className="text-3xl text-white" />
                </button>
            </div>}
        </div>
    )
}

export default ModalShelters