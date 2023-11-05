import { useStepperContext } from "../../contexts/StepperContext";
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Row, Col} from 'antd';


export default function FinRatio({prevStep, nextStep}) {
  const [error, setError] = useState("")
  const { userData, setUserData } = useStepperContext();


  const onChange = (element, index) => {
    let finRatiosOptions = userData.finRatiosOptions
    setUserData({
      ...userData,
      finRatiosOptions: [...finRatiosOptions.slice(0, index),
        {value: element.value, selected: !finRatiosOptions[index].selected},
        ...finRatiosOptions.slice(index + 1),
      ]
    })
  };

  const validate = () => {
    let options = userData.finRatiosOptions
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        nextStep()
        return
      }
    }

    setError("You must select at least one fin ratio")
  }


  return (
      <div className="flex flex-col ">
        <Form
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            autoComplete="off"
        >
          <Form.Item name="TimeRatio" label="Select Time Ratio">
            {
              userData.finRatiosOptions.map((e, index) => {
                return (
                    <Col span={16} className="mt-3">
                      <Checkbox style={{color:"gray"}} checked={e.selected}
                                onChange={() => onChange(e, index)}>{e.value}</Checkbox>
                    </Col>
                )
              })
            }
          </Form.Item>
          {error && <p className="text-red-600">{error}</p>}
          <div className="container mt-4 mb-8 flex justify-between">
            <Button htmlType="button" onClick={prevStep}
                    className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
              Back
            </Button>

            <Button htmlType="button" onClick={validate}
                    className="cursor-pointer rounded-lg bg-green-500 mr-8 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
            >
              Next
            </Button>
          </div>
        </Form>

      </div>
  )
}
