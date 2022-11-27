import { Link } from 'react-router-dom'
import image from './daschshund.png'

const Introduction = () => {

  return (
    <section>
      <div className="lg:ml-1/3max-w-max">
        <div className="flex flex-row items-center mx-auto max-w-7xl 2xl:gap-x-28">

          <div className="lg:max-w-lg relative top-[-90px] max-sm:hidden">
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

          <div className="relative md:top-[-100px] lg:top-[-100px] flex flex-col md:ml-[-60px] lg:ml-[-60px]">
            <h1 className="mb-8  text-4xl font-[500] text-[#201008] md:text-7xl lg:text-[4.5rem] lg:w-[600px]">
              You can't buy love, but you can <strong className="font-[800]">rescue</strong> it!
            </h1>
            <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
              <div className="mt-3 rounded-lg sm:mt-0">
                <Link to="/home">
                  <button className="bg-[#F87171] text-white h-[60px] w-[200px] max-sm:ml-24 max-sm:mb-5 rounded-lg font-[500] hover:bg-[#a14c4c] duration-500 active:bg-[#4d2c22]">Donate today</button>
                </Link>
                <Link to="/learnMore">
                <button className="bg-none h-[60px] w-[200px] drop-shadow-md max-sm:ml-24 ml-5 rounded-xl border-2 border-[#F87171] text-[#F87171] font-[700] hover:bg-[#a14c4c] hover:border-[#a14c4c] hover:text-white duration-500 active:bg-[#7c4737]">Learn more</button>
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
