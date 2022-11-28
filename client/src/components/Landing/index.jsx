import React from "react";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Carousel from "./Carousel";
import Footer from "./Footer/Footer"
import './scrollDown.css'

function Landing() {
  

  return (
    <div className="bg-[#FFF5F4]">
      <Navbar />
      <Introduction />

      <div className="relative lg:top-[-140px] max-sm:hidden">
            <section className="demo section07" id="section07">
              <a href="#trending"><span></span><span></span><span></span></a>
            </section>
      </div>

      <div id="trending">
        <Carousel />
      </div>

      <div>
        <div className="block mx-auto mt-16">

          <div className="flex flex-col items-center text-center mx-auto mt-20">
            <h1 id="#trending" className="mb-8 w-max text-2xl font-bold leading-none tracking-tighter text-[#000] md:text-5xl lg:text-5xl">Helping animals around the globe.</h1>

            <p className="text-[#000] text-lg  md:text-3xl lg:text-3xl mt-10 w-full font-sans">At Paws Founding we know that NGOs and community shelters, usually have a really hard time raising money and lack tools to campaign for it.</p>

            <p className="text-[#000] text-lg md:text-3xl lg:text-3xl mt-10 w-full">That's why our page is completely pro-bono, of course you can help us and them by donating to our campain: all of the extra profits will go to the least founded shelters in the page.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>

  );
}

export default Landing;
