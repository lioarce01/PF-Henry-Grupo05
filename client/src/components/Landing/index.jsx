import React from "react";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Carousel from "./Carousel";
import Footer from "./Footer/Footer"
import './scrollDown.css'

function Landing() {
  

  return (
    <div className="bg-[#FFF5F4] dark:bg-[#27242C] w-full">
      <Navbar />
      <Introduction />

      <div className="lg:mt-[70px] 2xl:mt-[90px] lg:mb-[200px] max-sm:hidden">
            <section className="demo section07" id="section07">
              <a href="#trending"><span></span><span></span><span></span></a>
            </section>
      </div>

      <div id="trending">
        <Carousel />
      </div>

      <div>
        <div className="block mx-auto mt-16 lg:mb-8 md:mb-8">

          <div className="flex flex-col items-center text-center mx-auto mt-20 p-4 lg:px-32 2xl:px-64">
            <h1 id="#trending" className="mb-4 text-2xl font-bold leading-none tracking-tighter text-[#000] dark:text-white md:text-5xl lg:text-5xl">Helping animals around the globe.</h1>

            <p className="text-[#000] dark:text-[#F0EEEE] text-lg  md:text-3xl lg:text-3xl mt-10 w-full font-sans xl:w-[55%] lg:w-[75%] md:w-[70%]">At Paws Founding we know that NGOs and community shelters, usually have a really hard time raising money and lack tools to campaign for it.</p>

            <p className="text-[#000] dark:text-[#F0EEEE] text-lg md:text-3xl lg:text-3xl mt-10 w-full xl:w-[55%] lg:w-[75%] md:w-[70%]">That's why our page is completely pro-bono, of course you can help us and them by donating to our campain: all of the extra profits will go to the least founded shelters in the page.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>

  );
}

export default Landing;
