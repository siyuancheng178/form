import React from "react";
import {Button} from "antd";

export default function Final({prevStep}) {
  return (
    <div className="container mt-4 mb-8 flex justify-between">
          <Button htmlType="button" onClick={prevStep}
                  className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
              Back
          </Button>

          <Button htmlType="button"
                  className="cursor-pointer rounded-lg bg-green-500 mr-8 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white">
              <a href="/form">New Report</a>
          </Button>
    </div>
  );
}
