import React from "react";
import { useEffect, useState } from "react";



const DescriptionWindow = ({
  details,
  shelterRefetch
}) => {
  const [toggle, setToggle] = useState(true);

  useEffect(()=>{
    return(()=>{
        shelterRefetch();
    })
  },[])


  return (
		<div className="flex flex-col items-center lg:w-full">
			<div className="w-full mb-2 lg:my-4 h-fit lg:p-0 lg:min-w-0 lg:w-full lg:max-w-full flex flex-row justify-center ">
				<div className="dark:bg-[#1B1A1F] bg-white p-2 px-4 sm:px-8 dark:shadow-[#E06161] shadow-[#FF7272] shadow-lg rounded-2xl mt-2 md:w-[85%] md:min-w-[500px] lg:max-w-[1000px] flex flex-col lg:items-center">
                    <div className="sm:text-[2rem] sm:mt-4 dark:text-[#E06161] text-[#FF7272] mt-2 text-lg font-bold">
                        <h2 className="text-center">{details?.name}</h2>
                    </div>
					<div className="my-4 min-h-[300px] sm:h-fit sm:my-8 text-left sm:text-lg ">
                        <span className="dark:text-[#F0EEEE]"
                        >{details?.description}</span>
                    </div>
                    <div className={`flex group flex-row w-full items-baseline justify-end mb-2 sm:mb-4`}>
                        <span className={`sm:text-[2rem] text-lg font-bold dark:text-white text-[#201008]  font-mono `}>Paws</span>
                        <span className={`sm:text-[2rem] text-lg font-bold dark:text-[#E06161] text-[#FF7272] `}>Founding</span>
                    </div>
				</div>
			</div>
		</div>
	)
};

export default DescriptionWindow;