import { Form, Button, Input, InputNumber, Select, Modal } from "antd";
const { TextArea } = Input;
import { useUpdateSubscriptionMutation } from "../../redux/apiSlices/subscriptionSlice";

import { useEffect } from 'react';

export default function EditSubscription({ isEditModalOpen, closeEditModal, singleSubscription }) {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditModalOpen && singleSubscription) {
      form.setFieldsValue({
        type: singleSubscription.type,
        price: singleSubscription.price,
        deliveryLimit: singleSubscription.deliveryLimit,
        description: singleSubscription.description
      });
    }
  }, [isEditModalOpen, singleSubscription]);  // Update form when modal is opened or subscription changes

  const onFinish = async (values) => {
    const editSubscriptionInfo = {
      price: values.price,
      deliveryLimit: values?.deliveryLimit,
      description: values.description
    };
    console.log("sub details : ", values)
    await updateSubscription({ id: singleSubscription?._id, data: values });
    form.resetFields();
    closeEditModal();
  };

  const onFinishFailed = (errorInfo) => {
    form.resetFields();
    console.log("Failed:", errorInfo);
    closeEditModal();
  };

  const handleEditCancel = () => {
    form.resetFields();
    closeEditModal();
  };

  const OPTIONS = [
    { label: 'Basic', value: 'Basic' },
    { label: 'Enterprise', value: 'Enterprise' },
    { label: 'Premium', value: 'Premium' },
  ];

  return (
    <Modal footer={null} open={isEditModalOpen} onCancel={() => handleEditCancel()} width={800} centered>
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
                <TextArea placeholder="Autosize height based on content lines" className="py-2 bg-gray-100 rounded-xl" autoSize={{ minRows: 4, maxRows: 12 }} />
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
                  Save and Change
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
