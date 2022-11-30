import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTheme } from "../../redux/slices/manageTheme";
import Navbar from "../Navbar/Navbar";

const Page404 = () => {
  const {darkmode} = useSelector(selectTheme)
  return (
    <>
   
    <section className="flex items-center justify-center h-screen p-16 dark:bg-[#27242C] bg-[#EFF0F3]">
      
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="flex flex-col items-center justify-center">
            <img className="w-[15rem]"
              src={true ? "https://res.cloudinary.com/dxxqabghy/image/upload/v1669606561/posts/mi1k2esjhry2vm8quphk.png" : "https://i.pinimg.com/originals/00/65/ee/0065ee133294c73fe29dbab81dc6acc9.png"}
              alt=""
            />
            <h2 className="mb-8 font-extrabold text-9xl text-[#FF7272]">
              <span className="sr-only text-neutral-600">Error</span>404
            </h2>
          </div>
          <p className="text-2xl font-semibold md:text-3xl text-neutral-600 dark:text-gray-400">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link to="/home">
            <button className="bg-white hover:bg-[#cc5c5c] text-white font-semibold py-2 px-4 rounded shadow bg-[#FF7272] dark:border-none">back to homepage</button>
          </Link>
          
        </div>
      </div>
    </section>
    </>
  );
};

export default Page404;
