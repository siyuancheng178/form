import { useStepperContext } from "../../contexts/StepperContext";
import {Button, Form} from 'antd';
import { Input } from 'antd';
import React, {useState} from "react";
import axios from "axios";
const { TextArea } = Input;


export default function Additional({prevStep, nextStep}) {
  const { userData, setUserData } = useStepperContext();
  const [ err, setErr ] = useState("")
  const [ isFetchingGPT, setIsFetchingGPT ] = useState(false)


  const onFinish = () => {
      setIsFetchingGPT(true)
      axios.get("/report")
          .then(res => {
              setUserData({...userData, report: res})
              nextStep()
          })
          .catch(err => setErr(`fail to generate report from GPT: ${err.message}`))
          .finally(() => setIsFetchingGPT(false))
  }

  return (
      <div className="flex flex-col ">
          <Form
              layout="vertical"
              labelCol={{ span: 8 }}
              autoComplete="off"
              onFinish={onFinish}
              initialValues={{apiKey: userData.apiKey}}
          >
              <Form.Item
                  label="OpenAI API Key"
                  name="apiKey"
                  rules={[
                      {
                          required: true,
                          validator: (_, value) => {
                              if (value === undefined) {
                                  return Promise.reject('Please your OpenAI API Key!');
                              }
                              return Promise.resolve();
                          },
                      },
                  ]}
                  onChange={(e) => setUserData({...userData, apiKey: e})}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="New Info"
                  name="info"
              >
                  <TextArea rows={4} onChange={(e) => setUserData({...userData, newInfo: e.target.value})}/>
              </Form.Item>

              <Form.Item
                  label="URL"
                  name="URL"
              >
                  <Input onChange={(e) => setUserData({...userData, URL: e.target.value})}/>
              </Form.Item>

              <Form.Item
                  label="Title"
                  name="title"
              >
                  <Input onChange={(e) => setUserData({...userData, title: e.target.value})}/>
              </Form.Item>
              {err && <p className="text-red-600">{err}</p>}
              <div className="container mt-4 mb-8 flex justify-between">
                  <Button htmlType="button" onClick={prevStep}
                          className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
                      Back
                  </Button>

                  {
                      !isFetchingGPT?
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
