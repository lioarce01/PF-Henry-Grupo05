import { Link } from 'react-router-dom'
import image from './daschshund.png'

const Introduction = () => {

  return (
    <section className='p-4'>
      <div className="lg:ml-1/3 max-w-max">
        <div className="flex flex-row items-center mx-auto max-w-7xl 2xl:gap-x-28">

          <div className="lg:max-w-lg max-sm:hidden">
            <div>
              <div className="">
                <div className="md:ml-48">
                  <img
                    alt="Dachshund"
                    src={image}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" md:top-[-100px] lg:top-[-100px] flex flex-col md:ml-[-60px] lg:ml-0">
            <h1 className="mb-8 text-4xl font-[500] text-[#201008] dark:text-[#F0EEEE] md:text-7xl lg:text-[3.5rem] lg:w-[600px]">
              You can't buy love, but you can <strong className="font-[800]">rescue</strong> it!
            </h1>
            <div className="mt-0 lg:mt-6 max-w-7xl">
              <div className="mt-3 rounded-lg sm:mt-0 flex flex-col items-center w-full">
                <Link to="/home">
                  <button className="bg-[#F87171] lg:mb-2 text-white h-[60px] w-[200px] max-sm:mb-5 rounded-lg font-[500] hover:bg-[#a14c4c] duration-500 active:bg-[#4d2c22]">Donate today</button>
                </Link>
                <Link to="/learnMore">
                <button className="bg-none h-[60px] w-[200px] drop-shadow-md  rounded-xl border-2 border-[#F87171] text-[#F87171] font-[700] hover:bg-[#a14c4c] hover:border-[#a14c4c] hover:text-white duration-500 active:bg-[#7c4737]">Learn more</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
