import imageDark from "../Navbar/logoDark.png"
import {useSelector} from "react-redux"

const Footer = () => {
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    const darkState = useSelector((state) => state.localStorage.manageTheme.darkmode)

    return (

        <footer className="w-full lg:h-[100px] md:h-[50px] sm:px-12 dark:bg-[#1B1A1F] bg-inherit xsm:h-[90px] xsm:px-2 lg:mt-8">
            <div className="border-t-[1px] border-[#3D190C] lg:pt-7 md:pt-4 flex flex-row xsm:flex-wrap items-center lg:justify-between xsm:justify-center">

                <div className="xsm:pt-4">
                    <ul className="flex max-sm:flex-wrap font-bold text-[#F87171]">
                        <li className="mx-10 hover:underline hover:text-[1.2rem]  lg:text-[1.1rem] text-xs duration-150"><a href="/home">Home</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem]  lg:text-[1.1rem] text-xs duration-150"><a href="/about">About</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem]  lg:text-[1.1rem] text-xs duration-150"><a href="#">Donate</a></li>

                    </ul>
                </div>
                <div className="flex md:flex-row xsm:flex-wrap items-center xsm:pb-2 xsm:pt-4 sm:p-0">
                    <img className="w-7 h-7 2xl:w-12 2xl:h-12" src={darkState ? imageDark : image} alt="logo"/>
                    <h3 className="ml-5 text-xs lg:text-[1.2rem]  font-bold dark:text-[#F0EEEE]">© 2022 PawsFounders, Inc.</h3>
                </div>

            </div>
        </footer>
    )
}

export default Footer;