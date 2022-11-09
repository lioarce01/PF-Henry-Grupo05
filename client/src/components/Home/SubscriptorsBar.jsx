import React, { useState } from 'react'
import SubsCard from './SubsCard'
import {BsBookmarkHeart} from 'react-icons/bs'
import {TbReportMoney } from "react-icons/tb";
import {AiFillHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const SubscriptorsBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-28" : "w-60 "
                } flex flex-col h-[55rem] overflow-y-scroll p-3 bg-gray-800 shadow duration-300`}
            >
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            PAWS
                        </h2>
                        {
                          open 
                          ? (<button onClick={() => setOpen(!open)} className='text-3xl font-bold text-white'> → </button>) 
                          : (<button onClick={() => setOpen(!open)} className='text-3xl font-bold text-white'> ← </button>)
                        }
                    </div>
                    <div className="relative">
                        
                    </div>
                    <div className="flex-1">
                        <div className='flex items-center justify-center py-2 my-2 text-white border-b-2'>
                            <Link>
                                <AiFillHome className='text-2xl'/>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center justify-center border-b-2'>
                          <div className='flex flex-col items-center justify-center'>
                            <TbReportMoney className='my-2 text-2xl text-white'/>
                          </div>
                          <div>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-row py-1'>
                                <BsBookmarkHeart className='my-2 text-2xl text-white'/>
                            </div>
                            <div>
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
                </div>
            </div>

        </div>
    );
}

export default SubscriptorsBar