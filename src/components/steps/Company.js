import { useStepperContext } from "../../contexts/StepperContext";
import {useState} from "react";
import { Select } from 'antd';
import { Form, Button } from 'antd';


export default function Company({nextStep}) {
  const { userData, setUserData } = useStepperContext();

  const companyOptions = [
    {label: "Apple", value: 0}, {label: "Google", value: 1}, {label: "Facebook", value: 2}
  ]

  const timeRangeOptions = [
    {label: "1Y", value: 0}, {label: "2Y", value: 1}, {label: "3Y", value: 2}
  ]
    const onFinish = (values) => {
       nextStep()
    };

  return (
    <div className="flex flex-col ">
        <Form
            layout="vertical"
            labelCol={{
                span: 8,
            }}
            autoComplete="off"
            onFinish={onFinish}
            initialValues={{
                company: companyOptions[userData.companyId],
                timeRange: timeRangeOptions[userData.timeRange]
            }}
        >
            <Form.Item
                label="Company"
                name="company"
                rules={[
                    {
                        required: true,
                        message: 'Please select one company',
                        validator: (_, value) => {
                            if (value === undefined) {
                                return Promise.reject('Please select a valid option');
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Select
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please select a company"
                    onChange={e =>  setUserData({...userData, companyId: e})}
                    options={companyOptions}
                />
            </Form.Item>

            <Form.Item
                label="Time Range"
                name="timeRange"
                rules={[
                    {
                        required: true,
                        message: 'Please select a time range',
                        validator: (_, value) => {
                            if (value === undefined) {
                                return Promise.reject('Please select a valid time range');
                            }
                            return Promise.resolve();
                        },
                    }
                ]}
            >
                <Select
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please select a time range used for ratio"
                    onChange={e => setUserData({...userData, timeRange: e})}
                    options={timeRangeOptions}
                />
            </Form.Item>
            <div className="container mt-4 mb-8 flex justify-between">
                <Button htmlType="button" className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
                    Back
                </Button>

                <Button htmlType="submit" className="cursor-pointer rounded-lg bg-green-500 mr-8 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
                >
                    Next
                </Button>
            </div>
        </Form>

    </div>
  );
}
