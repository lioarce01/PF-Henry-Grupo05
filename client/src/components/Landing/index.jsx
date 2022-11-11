import React from "react";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Carousel from "./Carousel";

function Landing() {
  const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

  return (
    <div className="bg-[#E1D7D3]">
      <Navbar />
      <Introduction />
      <Carousel />

      <div>
        <div className="block mx-auto mt-20">

          <div className="w-20 h-20 block mx-auto">
            <img src="https://cdn2.iconfinder.com/data/icons/arrows-3-1/512/xxx039-512.png" />
          </div>

          <div className="flex flex-col items-center text-center mx-auto mt-20">
            <h1 class="mb-8 w-max text-4xl font-bold leading-none tracking-tighter text-[#3D190C] md:text-7xl lg:text-5xl ">Helping animals around the globe.</h1>

            <p className="text-[#3D190C] md:text-7xl lg:text-3xl mt-10 w-[650px]">At Paws Founding we know that NGOs and community shelters, usually have a really hard time raising money and lack tools to campaign for it.</p>

            <p className="text-[#3D190C] md:text-7xl lg:text-3xl mt-10 w-[650px]">That's why our page is completly pro-bono, of course you can help us and them by donating to our campain: all of the extra profits will go to the least founded shelters in the page.</p>
          </div>

        </div>
      </div>

      <footer className="w-full h-[100px] mt-40 px-12">
        <div className="border-t-[1px] border-black pt-7 flex flex-row">


        <div className="flex flex-row md:absolute">
          <img className="w-7 h-7" src={image} />
          <h3 className="ml-5 text-[1.2rem] font-bold">© 2022 PawsFounders, Inc.</h3>
        </div>



        <div className="mx-auto">
            <ul className="flex flex-row font-bold text-[#b14623]">
              <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="/home">Home</a></li>
              <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="#">About</a></li>
              <li className="mx-10 hover:underline hover:text-[1.2rem] duration-150"><a href="#">Donate</a></li>
            </ul>
        </div>


        </div>
      </footer>
    </div>

  );
}

export default Landing;
