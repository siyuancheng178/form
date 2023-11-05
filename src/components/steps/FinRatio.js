import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState } from 'react';
import { Button, Checkbox, Form,  Col } from 'antd';
import axios from "axios";


export default function FinRatio({prevStep, nextStep}) {
  const { userData, setUserData } = useStepperContext();
  const [ error, setError] = useState("")
  const [ isFetchingNews, setIsFetchingNews ] = useState(false)



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
    setIsFetchingNews(true)
    let options = userData.finRatiosOptions
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        proceedToNext()
        return
      }
    }
    setError("You must select at least one fin ratio")
    setIsFetchingNews(false)
  }

  const proceedToNext = () => {
    axios.get("/news")
        .then(res => {
          setUserData({...userData, news: res})
        })
        .catch(err => {
          console.log(err)
          setError(`fail to retrieve news: ${err.message}`)
        })
        .finally(() => {
          setIsFetchingNews(false)
        })
  }


  return (
      <div className="flex flex-col ">
        <Form
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            autoComplete="off"
            onFinish={validate}
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

            {
              !isFetchingNews?
                  <Button htmlType="submit" className="cursor-pointer rounded-lg bg-green-500 mr-8 px-4 font-semibold uppercase text-white transition duration-200
                ease-in-out hover:bg-slate-700 hover:text-white">
                    Next
                  </Button>:
                  <Button htmlType="submit" className="cursor-pointer rounded-lg border-blue-500 mr-8 px-4 font-semibold text-blue-500 transition duration-200
                cursor-not-allowed opacity-50">
                    Loading....
                  </Button>
            }
          </div>
        </Form>

      </div>
  )
}
