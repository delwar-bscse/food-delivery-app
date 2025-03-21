import { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useUpdateSubscriptionMutation } from "../../redux/apiSlices/subscriptionSlice";

export default function EditSubscription({ handleOk, singleSubscription, setSingleSubscription }) {
  const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation();

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const editSubscription = {
      type: singleSubscription?.type,
      price: values.price
    }
    // console.log("Success:", editSubscription);
    updateSubscription(editSubscription);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className='space-y-8 p-6 pt-16'>
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
            initialValues={{
              remember: false, // Default state for the checkbox
            }}
          >
            <div>
              {/* <Form.Item
                name="heading"
                label="Heading"
              >
                <Input className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item> */}

              <Form.Item
                name="price"
                label="Price"
              >
                <Input className="py-3 bg-gray-100 rounded-md" />
              </Form.Item>
              {/* 
              <Form.Item
                name="des01"
                label="Description 01"
              >
                <Input className="py-2 bg-gray-100 rounded-xl" />
              </Form.Item>

              <Form.Item
                name="des02"
                label="Description 02"
              >
                <Input className="py-2 bg-gray-100 rounded-xl" />
              </Form.Item>

              <Form.Item
                name="des03"
                label="Description 03"
              >
                <Input className="py-2 bg-gray-100 rounded-xl" />
              </Form.Item> */}
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
                  Save and Change
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
