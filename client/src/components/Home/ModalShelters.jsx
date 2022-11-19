import { useGetSheltersQuery } from "../../redux/api/shelters"
import { BsFillPersonFill } from "react-icons/bs"
import { FaWindowClose } from 'react-icons/fa'
import { FaComments } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ONGFilters from './ONGFilters'
import { useEffect, useState } from "react"

const ModalShelters = ({ setOpen }) => {

    const { data: allShelters } = useGetSheltersQuery({name: "", enabled: true})
    const [shelters, setShelters] = useState(allShelters)
    
    const closeModal = () => setOpen(false)

    return (
        <div className="flex items-center z-50 fixed right-0 bottom-[0px] w-screen h-screen backdrop-blur-sm bg-[#161616c5]">
            <div className="flex flex-row mx-auto w-[1500px] h-[900px] bg-[#FAF2E7] rounded-[20px]">

                <div className="bg-[#FDDCB1] h-full w-[25%] flex rounded-l-[20px]">
                    <ONGFilters setShelters={setShelters} />
                </div>

                <div className="h-full w-[75%] flex flex-col">
                    <div className="flex">
                        <div className='w-full'>
                            <FaWindowClose className="text-[#c46241] float-right w-[30px] h-[30px] mt-[10px] mr-[10px]" onClick={closeModal} />
                        </div>
                    </div>


                    <div className="flex flex-row mx-auto mt-[20px] pb-[40px] mb-[40px] flex-wrap overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#c46241] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
                        <div className="flex flex-row mx-auto flex-wrap w-[87%]">
                            {shelters?.map(s => {
                                return (
                                    <Link key={s.id} to={`/${s.id}/profile`}>
                                        <div className="w-[420px] ml-[30px] bg-white mt-[20px] rounded-[40px] pl-[20px] pt-[20px] pr-[20px] pb-[15px] mr-[30px] shadow-[0px_19px_23px_-6px_rgba(190,161,122,1)]">
                                            <div className="flex flex-row">
                                                <img src={s.profilePic} className="object-cover w-[120px] h-[120px] rounded-[25px] shadow-[0px_12px_10px_-6px_rgba(190,161,122,1)]" />

                                                <div className="flex flex-col items-start mt-[10px] ml-[25px]">
                                                    <h1 className="flex flex-col leading-5 font-[700] text-[#201008]">{s.name}</h1>
                                                    <p className="flex flex-col text-[#c46241] font-semibold">{s.city}</p>
                                                    <p className="flex flex-row w-[250px] mt-[10px] font-semibold text-[#929294] text-[0.9rem]">
                                                        {s.description.length > 61 ? (s.description.slice(0, 61) + "...") : (s.description)}</p>
                                                </div>

                                            </div>

                                            <div className="flex w-full justify-end">
                                                <div className="flex flex-row mr-[15px]">
                                                    <p className="flex mr-[2px] text-[#c46241]">{s.followers?.length}</p>
                                                    <BsFillPersonFill className="text-[#c46241] flex mt-[5px]" />
                                                </div>

                                                <div className="flex flex-row">
                                                    <p className="flex mr-[2px] text-[#c46241]">{s.posts?.length}</p>
                                                    <FaComments className="text-[#c46241] flex mt-[5px]" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalShelters