import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Page404 = () => {
  return (
    <>
   
    <section className="flex items-center justify-center h-screen p-16 ">
      
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="flex flex-col items-center justify-center">
            <img className="w-[15rem]"
              src="https://i.pinimg.com/originals/00/65/ee/0065ee133294c73fe29dbab81dc6acc9.png"
              alt=""
            />
            <h2 className="mb-8 font-extrabold text-9xl  text-[#000]">
              <span className="sr-only text-neutral-600">Error</span>404
            </h2>
          </div>
          <p className="text-2xl font-semibold md:text-3xl text-neutral-600">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400 text-gray-500">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link to="/home">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">back to homepage</button>
          </Link>
          
        </div>
      </div>
    </section>
    </>
  );
};

export default Page404;
