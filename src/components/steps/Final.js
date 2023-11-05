import React from "react";

export default function Final() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <a className="mt-10" href="/user/dashboard">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Close
          </button>
        </a>
      </div>
    </div>
  );
}
