import { useStepperContext } from "../../contexts/StepperContext";
import { useState, useEffect } from "react";
import { Select } from 'antd';
import { Form, Button } from 'antd';
import axios from 'axios'

export default function Company({nextStep}) {
    const { userData, setUserData } = useStepperContext();
    const [ isLoadingCompany, setIsLoadingCompany ] = useState(userData.companyOptions.length === 0)
    const [ isFetchingRatios, setIsFetchingRatios ] = useState(false)
    const [ err, setErr ] = useState("")

    const timeRangeOptions = [
        {label: "1Y", value: 0}, {label: "2Y", value: 1}, {label: "3Y", value: 2}
    ]

    const fetchCompanyList = () => {
        axios.get('/firms')
            .then(res => {
                setUserData({...userData, companyOptions: res})
                setIsLoadingCompany(false)
            })
            .catch((err) => {
                setErr(`fail to retrieve company list: ${err.message}`)
                console.log(err.message)
            })
    }

    useEffect(() => {
        if(userData.companyOptions.length === 0) {
            fetchCompanyList()
        }
    }, [])

    const onFinish = (values) => {
        setIsFetchingRatios(true)
        axios.get('/ratios')
            .then(res => {
                setUserData({...userData, ratios: res})
                setIsFetchingRatios(false)
                nextStep()
            })
            .catch(err => {
                setErr(`fail to retrieve fin ratios ${err.message}`)
                console.log(err.message)
            })
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
                company: userData.companyOptions[userData.companyId],
                timeRange: timeRangeOptions[userData.timeRange]
            }}
        >
            <Form.Item
                label="Company"
                name="company"
                rules={[
                    {
                        required: true,
                        validator: (_, value) => {
                            if (value === undefined) {
                                return Promise.reject('Please select a company');
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
                    onChange={e => setUserData({...userData, companyId: e})}
                    options={userData.companyOptions}
                    loading={isLoadingCompany}
                />
            </Form.Item>

            <Form.Item
                label="Time Range"
                name="timeRange"
                rules={[
                    {
                        required: true,
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
            {
                err && <p className="text-xs text-red-600">{err}</p>
            }

            <div className="container mt-4 mb-8 flex justify-between">
                <Button htmlType="button" className="cursor-pointer rounded-xl border-2 ml-10 border-slate-300 bg-white px-4 font-semibold uppercase
                text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white cursor-not-allowed opacity-50">
                    Back
                </Button>

                {
                    !isFetchingRatios && !err?
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
  );
}
