import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";


const LearnMore = () =>{
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    return(
        <div className="bg-[#eff0f3] z-10 w-full min-h-screen dark:bg-[#1b1a1f] dark:text-[#F0EEEE]">
            <Navbar/>
            <div>
                <div className="w-full flex flex-row items-center justify-center ml-[10px] animate-tracking-animation">
                        <span className="font-bold text-4xl sm:text-7xl text-[#201008] dark:text-white">
                            Paws
                        </span>
                        <span className="font-bold text-4xl sm:text-7xl text-[#ff7272]">
                            Founding
                        </span>
                            
                </div>
                <div className="indent-7 w-full pt-14 font-bold text-xl text-justify flex flex-col items-center justify-center animate-textFocus-animation sm:text-2xl">
                    <p className="w-11/12 p-2 sm:w-3/4 p-4">
                        Today one of the market segments that moves the most money in the world without a doubt is that of pets. There are many solutions to satisfy the different needs that revolve around a pet: vets, fashion, accessories, food, to name a few. 
                    </p>
                    <p className="w-11/12 p-2 sm:w-3/4 p-4">
                        However, there is a sector of this segment that is being ignored by the market, for which there are no solutions, especially technological ones, which are: animal shelters and NGOs that are in charge of preserving animal life. Although some famous NGOs have their own website, there is no technological tool available to any NGO that helps them sustain their activity, without incurring an extra financial effort.
                    </p>
                    <p className="w-11/12 p-2 md:w-3/4 p-4">
                        Under the premise that developers take it upon ourselves to solve real-life problems, Paws Funding was born, a crowdfunding platform with social network functions, which provides animal shelters with a free tool that allows them to receive donations transparently, as well as disseminate their activities through posts, which excite more followers willing to collaborate with the NGO, which results in the NGO being able to grow and continue with its activities.
                    </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center p-2 animate-textFocus-animation">
                    <img className="w-40 h-40 dark:invert" src={image} alt='Not Found'/>
                </div>
            </div>
            <div className="relative w-full fixed p-0 mb-0">
                <Footer/>
            </div>
        </div>
    )
}

export default LearnMore