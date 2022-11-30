import { Link } from 'react-router-dom'
import image from './daschshund.png'

const Introduction = () => {

  return (
    <section className='p-4 2xl:pb-0 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:relative 2xl:top-0'>
      <div className="lg:mx-auto max-w-max w-full">
        <div className="flex flex-row items-center mx-auto max-w-7xl 2xl:gap-x-28 lg:gap-x-10 lg:ml-16 md:gap-8">

          <div className="mx-auto mr-0 max-sm:hidden">
            <div>
              <div className="">
                <div className="md:ml-0 lg:ml-14 2xl:ml-32 lg:w-[350px] xl:w-[400px] lg:h-[600px] 2xl:w-[550px] 2xl:h-[800px] lg:mb-10">
                  <img
                    className=' lg:object-contain lg:relative lg:top-[-110px] 2xl:top-[-220px] md:translate-y-[-7rem] lg:translate-y-0'
                    alt="Dachshund"
                    src={image}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" md:top-[-100px] lg:top-[-100px] flex flex-col md:ml-[-60px] lg:ml-0">
            <h1 className="mb-8 text-4xl font-[500] text-[#201008] dark:text-[#F0EEEE] md:text-6xl lg:text-[3.5rem] 2xl:w-[90%] lg:w-[70%] md:w-[90%] md:m-0 xsm:w-[75%] xsm:mx-auto">
              You can't buy love, but you can <strong className="font-[800] dark:text-white">rescue</strong> it!
            </h1>
            <div className="mt-0 lg:mt-6 max-w-7xl">
              <div className="mt-3 rounded-lg sm:mt-0 flex flex-col gap-4 lg:flex-row items-center w-full">
                <Link to="/home">
                  <button className="bg-[#F87171] text-white h-[60px] w-[200px] max-sm:mb-5 rounded-lg font-[500] hover:bg-[#a14c4c] duration-500 active:bg-[#4d2c22]">Donate today</button>
                </Link>
                <Link to="/learnMore">
                  <button className="bg-none h-[60px] w-[200px] drop-shadow-md rounded-xl border-2 border-[#F87171] text-[#F87171] font-[700] hover:bg-[#a14c4c] hover:border-[#a14c4c] hover:text-white duration-500 active:bg-[#7c4737]">Learn more</button>
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
