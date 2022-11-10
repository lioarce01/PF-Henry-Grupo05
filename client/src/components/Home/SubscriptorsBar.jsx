import React, { useState } from 'react'
import SubsCard from './SubsCard'
import {BsArrowBarLeft, BsArrowBarRight, BsBookmarkHeart} from 'react-icons/bs'
import {TbReportMoney } from "react-icons/tb";
import {AiFillHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const SubscriptorsBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="fixed left-0 flex">
            <div
                className={` ${
                    open ? "w-28" : "w-60 "
                } flex flex-col h-[54rem] overflow-y-scroll p-2 bg-slate-200`}
            >
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-black">
                            PAWS
                        </h2>
                        {
                          open 
                          ? (<button onClick={() => setOpen(!open)} className='px-1 text-2xl font-bold text-black outline-none'> <BsArrowBarRight/> </button>) 
                          : (<button onClick={() => setOpen(!open)} className='px-1 text-2xl font-bold text-black outline-none'> <BsArrowBarLeft/> </button>)
                        }
                    </div>

                    {
                        open ? (
                            <div className="flex-1">
                                <div className='flex items-center justify-center py-2 my-2 text-black border-b-2 border-slate-500'>
                                    <Link>
                                        <AiFillHome className='text-2xl'/>
                                    </Link>
                                </div>
                                <div className='flex flex-col items-center justify-center border-b-2 border-slate-600'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <TbReportMoney className='my-2 text-2xl text-black'/>
                                    </div>
                                    <div className=''>
                                            <SubsCard/>
                                            <SubsCard/>
                                            <SubsCard/>
                                            <SubsCard/>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='flex flex-row py-1'>
                                        <BsBookmarkHeart className='my-2 text-2xl text-black'/>
                                    </div>
                                    <div className=''>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                        <SubsCard/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1">
                                <div className='flex items-center justify-center py-2 my-2 text-black border-b-2 border-slate-500'>
                                    <Link>
                                        <AiFillHome className='text-2xl'/>
                                    </Link>
                                </div>
                                    <div className='transition duration-300 border-b-2 border-slate-600'>
                                        <div className='flex flex-col items-center justify-center'>
                                        <TbReportMoney className='my-2 text-2xl text-black'/>
                                    </div>
                                <div>
                                    <SubsCard name='ONG NAME' user='username'/>
                                    <SubsCard name='ONG NAME' user='username'/>
                                    <SubsCard name='ONG NAME' user='username'/>
                                    <SubsCard name='ONG NAME' user='username'/>
                                </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row items-center justify-center py-1'>
                                        <BsBookmarkHeart className='my-2 text-2xl text-black'/>
                                    </div>
                                    <div>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>
                                        <SubsCard name='ONG NAME' user='username'/>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default SubscriptorsBar