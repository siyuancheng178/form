import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState } from 'react';
import {Card, Switch, Checkbox, Button, Form, Col} from 'antd';



export default function News({prevStep, nextStep}) {
  const { userData, setUserData } = useStepperContext();
    const [ error, setError ] = useState("")
    const [loading, setLoading] = useState(true);


  const onChange = (element, index) => {
      let news = userData.news
      setUserData({
          ...userData,
          news: [...news.slice(0, index),
              {...news[index], selected: !news[index].selected},
              ...news.slice(index + 1)
          ]
      })
  };

  const validate = () => {
      let news = userData.news
      for (let i = 0; i < news.length; i++) {
          if (news[i].selected) {
              nextStep()
              return
          }
      }
      setError("You must select at least one news")
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
            <Form.Item>
                {
                    userData.news.map((e, index) => {
                        return (
                            <div className="mt-7 mx-auto w-4/5">
                                <Card bordered={false} loading={loading} title="Card title"
                                      extra={<Checkbox className="text-xs" checked={e.selected}
                                                       onClick={() => onChange(e, index)}>Select</Checkbox>}
                                >
                                    <p>This is the description</p>
                                </Card>
                            </div>
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
  );



}
