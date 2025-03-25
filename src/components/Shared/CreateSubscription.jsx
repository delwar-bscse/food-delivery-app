import { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";

export default function CreateSubscription({ handleOk, singleSubscription, setSingleSubscription }) {

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Success:", values);
    handleOk();
    // try {
    //   const formData = new FormData();
    //   values?.name && formData.append("name", values?.name);
    //   values?.dob && formData.append("dob", values?.dob);
    //   values?.permanentAddress && formData.append("permanentAddress", values?.permanentAddress);
    //   values?.postalCode && formData.append("postalCode", values?.postalCode);
    //   values?.username && formData.append("username", values?.username);

    //   if (file) {
    //     formData.append("image", file);
    //   } else {
    //     formData.append("image", imgURL);
    //   }

    //   const response = await updateAdminProfile(formData);
    //   // const response = await updateAdminProfile();

    //   if (response?.data) {
    //     toast.success("Success updating form:",response?.data?.message);
    //     refetch();
    //   } else {
    //     toast.error("Error updating form:",response?.data?.message);
    //   }
    // } catch (error) {
    //   console.error("Error updating form:", error);
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className='space-y-8 p-6 pt-16'>
        <div>
          <h2 className='text-3xl font-semibold text-center'>Edit Subscription Details</h2>
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
                name="heading"
                label="Heading"
              >
                <Input className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price"
              >
                <Input className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item>

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
                    height: 44,
                    fontWeight: "400px",
                    background: "#0B375E",
                    color: "white",
                  }}
                  className="roboto-medium text-sm leading-4"
                >
                  Create Subscription
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
