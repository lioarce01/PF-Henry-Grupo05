import React from "react";
import Button from "../Button";

const Introduction = () => {

    const title = "Paws Founding"
    const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora consequatur praesentium quam reprehenderit itaque nisi, vero sed earum veritatis, voluptate et ratione commodi blanditiis minima nam provident quod omnis atque."
    const image = "https://pngimg.com/uploads/dog/dog_PNG50348.png"

  return (
    <section>
      <div className="px-4 py-8 mx-auto max-w-max sm:px-6 md:px-12 lg:px-24 lg:py-16">
        <div className="flex flex-wrap items-center mx-auto max-w-7xl 2xl:gap-x-28">
        <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
            <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
              {title}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
              {description}
            </p>
            <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
              <div className="mt-3 rounded-lg sm:mt-0">
                <Button name="Explore" link="/home" />
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
            <div>
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <img
                    className="object-cover object-center mx-auto rounded-lg "
                    alt="hero"
                    src={image}
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Introduction;
