import React from "react";
import Button from "../Landing/Button";

const Page404 = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
        
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600 text-neutral-600">
            <span className="sr-only text-neutral-600">Error</span>404
          </h2>
          
          <p className="text-2xl font-semibold md:text-3xl text-neutral-600">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400 text-gray-500">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button name={'back to homepage'} link="/home"/>
        </div>
        
      </div>
    </section>
  );
};

export default Page404;
