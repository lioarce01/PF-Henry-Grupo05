import React, { useState } from 'react'
import SubsCard from './SubsCard'

const SubscriptorsBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-40" : "w-60 "
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
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="transition rounded-md hover:bg-gray-700 duration 300 ">
                                <a
                                    href="/home"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Home</span>
                                </a>
                            </li>
                        </ul>
                        <div className='flex flex-col items-start justify-center'>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
                          <SubsCard/>
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
    );
}

export default SubscriptorsBar