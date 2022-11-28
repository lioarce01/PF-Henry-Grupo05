import imageDark from "../Navbar/logoDark.png"
import {useSelector} from "react-redux"

const Footer = () => {
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    const darkState = useSelector((state) => state.localStorage.manageTheme.darkmode)

    return (

        <footer className="w-full lg:h-[100px] md:h-[50px] px-12 dark:bg-[#1B1A1F]">
            <div className="border-t-[1px] border-[#3D190C] lg:pt-7 flex flex-row">


                <div className="flex flex-row md:absolute">
                    <img className="w-7 h-7" src={darkState ? imageDark : image} />
                    <h3 className="ml-5 text-xs lg:text-[1.2rem] font-bold dark:text-[#F0EEEE]">© 2022 PawsFounders, Inc.</h3>
                </div>

                <div className="lg:mx-auto md:ml-72">
                    <ul className="flex max-sm:flex-col font-bold text-[#F87171]">
                        <li className="mx-10 hover:underline hover:text-[1.2rem] lg:text-[1.1rem] text-xs duration-150"><a href="/home">Home</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem] lg:text-[1.1rem] text-xs duration-150"><a href="/about">About</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem] lg:text-[1.1rem] text-xs duration-150"><a href="#">Donate</a></li>

                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer;