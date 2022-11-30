import { Link } from "react-router-dom"
import { FaDog, FaCat, FaKiwiBird } from 'react-icons/fa'
import { SiHappycow } from 'react-icons/si'
import { GiElephant } from 'react-icons/gi'

const CarouselCard = ({ id, image, name, city, budget, listAnimals, profilePic, authorId }) => {

    // formatting budget and goal to show the $ sign,
    // as well as the thousands separator
    const moneyFormat = (num) => {
        return num?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        })
    }

    return (
        <Link to={`/${id}/profile`}>
            <div className="bg-white h-[330px] w-[280px] group rounded-[25px] pt-[7px] hover:mt-[10px]
             shadow-[6px_16px_54px_-27px_rgba(133,133,133,0.4)] transition-all duration-300 dark:bg-[#1b1a1f] dark:shadow-[6px_16px_54px_-27px_rgba(100,100,100,0.4)]">

                <div className="mx-auto w-[260px] h-[170px] bg-gradient-to-b from-[#FF7272] to-[#8f3e3e] rounded-[25px] group-hover:to-[#4d2121]
                dark:from-[#ec5959] dark:to-[#420f0f] dark:group-hover:to-[#0c0b0b]">
                    <img src={image} className="w-full h-full rounded-[25px] object-cover opacity-40" />
                </div>

                <div className="px-[25px] relative bottom-[10px]">

                    <div className="flex flex-row">
                        {listAnimals.includes("Dogs") ? (
                            <div className="bg-[#4b5bf0] dark:bg-[#7f8af3] w-[30px] h-[30px] flex items-center rounded-full outline outline-2 outline-white hover:animate-spin">
                                <FaDog className="text-white mx-auto" />
                            </div>
                        ) : null}

                        {listAnimals.includes("Cats") ? (
                            <div className="bg-[#4b5bf0] dark:bg-[#7f8af3] w-[30px] h-[30px] ml-[-2px] flex items-center rounded-full outline outline-2 outline-white hover:animate-spin">
                                <FaCat className="text-white mx-auto" />
                            </div>
                        ) : null}

                        {listAnimals.includes("Domestic Animals") ? (
                            <div className="bg-[#4b5bf0] dark:bg-[#7f8af3] w-[30px] h-[30px] ml-[-2px] flex items-center rounded-full outline outline-2 outline-white hover:animate-spin">
                                <FaKiwiBird className="text-white mx-auto" />
                            </div>
                        ) : null}

                        {listAnimals.includes("Wild Animals") ? (
                            <div className="bg-[#4b5bf0] dark:bg-[#7f8af3] w-[30px] h-[30px] ml-[-2px] flex items-center rounded-full outline outline-2 outline-white hover:animate-spin">
                                <GiElephant className="text-white mx-auto" />
                            </div>
                        ) : null}

                        {listAnimals.includes("Farm Animals") ? (
                            <div className="bg-[#4b5bf0] dark:bg-[#7f8af3] w-[30px] h-[30px] ml-[-2px] flex items-center rounded-full outline outline-2 outline-white hover:animate-spin">
                                <SiHappycow className="text-white mx-auto" />
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-row">
                        <h1 className="font-semibold mt-[7px] text-[1.2rem] text-[#838788] dark:text-[#afb3b4]">{name.length > 15 ? name.slice(0, 14) + "..." : name}</h1>
                        <Link to={`/users/${authorId}`} className="ml-auto">
                            <img src={profilePic} className="h-[30px] w-[30px] rounded-full mt-[5px] outline outline-offset-2 outline-2 outline-[#FF7272] hover:opacity-80"/>
                        </Link>
                    </div>

                    <div className="flex flex-row mt-[15px]">
                        <h2 className="flex text-[#ACB1B2]">City:</h2>
                        <h2 className="flex font-semibold ml-auto text-[#979b9c] dark:text-[#abb0b1]">{(city.length > 20) ? city.slice(0,20)+'...' : city}</h2>
                    </div>

                    <div className="flex flex-row mt-[15px]">
                        <h2 className="flex text-[#ACB1B2]">Total Collected:</h2>
                        <h2 className="flex font-semibold ml-auto text-[#979b9c] dark:text-[#abb0b1]">{moneyFormat(budget)}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CarouselCard