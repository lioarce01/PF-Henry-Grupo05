const Footer = () => {
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    return (
        <footer className="w-full h-[100px] mt-40 px-12">
            <div className="border-t-[1px] border-[#3D190C] pt-7 flex flex-row">


                <div className="flex flex-row md:absolute">
                    <img className="w-7 h-7" src={image} />
                    <h3 className="ml-5 text-[1.2rem] font-bold">© 2022 PawsFounders, Inc.</h3>
                </div>



                <div className="mx-auto">
                    <ul className="flex flex-row font-bold text-[#b14623]">
                        <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="/home">Home</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="/about">About</a></li>
                        <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="#">Donate</a></li>
                    </ul>
                </div>


            </div>
        </footer>
    )
}

export default Footer;