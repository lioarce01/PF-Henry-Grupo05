const Footer = () => {
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    return (
        <footer className="w-full h-[100px] mt-24 px-12">
            <div className="border-t-[1px] border-[#3D190C] pt-7 flex flex-row lg:justify-between lg:items-center">


                <div className="flex flex-row items-center">
                    <img className="w-10 h-10 dark:invert" src={image} />
                    <h3 className="ml-5  text-xs md:text-[1.2rem] dark:text-[#F0EEEE] font-bold">© 2022 PawsFounders, Inc.</h3>
                </div>



                <div className="mx-auto lg:mx-0">
                    <ul className="flex max-sm:flex-col font-bold text-[#F87171]">
                        <li className="mx-10 hover:underline text-sm hover:scale-[1.05] duration-300"><a href="/home">Home</a></li>
                        <li className="mx-10 hover:underline text-sm hover:scale-[1.05] duration-300"><a href="/about">About</a></li>
                        <li className="mx-10 hover:underline text-sm hover:scale-[1.05] duration-300"><a href="#">Donate</a></li>
                    </ul>
                </div>


            </div>
        </footer>
    )
}

export default Footer;