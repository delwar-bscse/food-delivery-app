import { Form, Button, Input, InputNumber } from "antd";
const { TextArea } = Input;
import { useCreateSubscriptionMutation, useUpdateSubscriptionMutation } from "../../redux/apiSlices/subscriptionSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSubscription() {
  const navigation = useNavigate();
  const [createSubscription] = useCreateSubscriptionMutation()
  
  

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Edit Subscription : ", values);
    const res = await createSubscription({...values,version:"1.1"});
    
    if(res.data){
      form.resetFields();
      navigation("/subscriptions");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <div className='space-y-8 p-6 pt-16 w-full max-w-[800px] mx-auto mt-8 bg-white rounded-xl shadow-custom-card'>
        <div>
          <h2 className='text-2xl font-semibold text-center'>Edit Subscription Price</h2>
        </div>
        <div className="w-full mx-auto">
          {/* Input Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div>
              <Form.Item
                name="type"
                label="Subscription Type"
              >
                <Input className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item>

              <div className="flex items-center gap-1 w-full">
                <div className="basis-1/2">
                  <Form.Item
                    name="price"
                    label="Price"
                  >
                    <InputNumber size="large" className="w-full py-1 rounded-md" />
                  </Form.Item>
                </div>
                <div className="basis-1/2">
                  <Form.Item
                    name="deliveryLimit"
                    label="Delivery Limit"
                  >
                    <InputNumber size="large" className="w-full py-1 rounded-md" />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                name="description"
                label="Subscription Description"
              >
                <TextArea placeholder="Autosize height based on content lines" className="py-2 bg-gray-100 rounded-xl"  autoSize={{ minRows: 4, maxRows: 12 }} />
              </Form.Item>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  block
                  style={{
                    width: 178,
                    height: 48,
                    fontWeight: "400px",
                    background: "#0B375E",
                    color: "white",
                  }}
                  className="roboto-medium text-sm leading-4"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
