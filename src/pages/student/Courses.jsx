import React from "react";

export const Courses = () => {
  const courses = [
    {
      id: 1,
      Title: "React",
      img: "react.jpg", 
      price: 100,
    },
    {
      id: 2,
      Title: "Angular",
      img: "react.jpg",
      price: 120,
    },
    {
      id: 3,
      Title: "Vue",
      img: "react.jpg",
      price: 110,
    },
    {
      id: 4,
      Title: "Node.js",
      img: "react.jpg",
      price: 150,
    },
  ];

  return (
    <div className="mt-5">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl text-center font-semibold">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {courses.map((itm) => (
            <div
              key={itm.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg"
                src={itm.img}
                alt={`${itm.Title} image`}
              />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {itm.Title}
                </h5>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1">
                   
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < 4 ? "text-yellow-300" : "text-gray-200"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${itm.price}
                  </span>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
