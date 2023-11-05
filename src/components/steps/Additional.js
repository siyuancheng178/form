import { useStepperContext } from "../../contexts/StepperContext";
import {Button, Form, Select} from 'antd';
import { Input } from 'antd';
import React from "react";
const { TextArea } = Input;
const { Option } = Select;

export default function Additional({prevStep, nextStep}) {
  const { userData, setUserData } = useStepperContext();

  const onFinish = () => {
      nextStep()
  }

  return (
      <div className="flex flex-col ">
          <Form
              layout="vertical"
              labelCol={{
                  span: 8,
              }}
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
                          message: 'Please your OpenAI API Key!',
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

              <div className="container mt-4 mb-8 flex justify-between">
                  <Button htmlType="button" onClick={prevStep}
                          className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
                      Back
                  </Button>

                  <Button htmlType="submit"
                          className="cursor-pointer rounded-lg bg-green-500 mr-8 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
                  >
                      Next
                  </Button>
              </div>
          </Form>
      </div>
  )
}
