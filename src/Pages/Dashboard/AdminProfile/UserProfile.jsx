import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import "react-phone-input-2/lib/style.css";
import {
  useFetchAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "../../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { ProfileImg } from "../../../assets/assets";
import { refactorFileUrl } from "../../../lib/filePathUrl";
import moment from "moment/moment";
import dayjs from "dayjs";

const baseUrl = import.meta.env.VITE_BASE_URL;

const PersonalInfo = () => {
  const [imgURL, setImgURL] = useState(null);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const imageInputRef = useRef(null);


  const { data: fetchAdminProfile, isLoading, refetch } = useFetchAdminProfileQuery();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();


  const adminData = fetchAdminProfile?.data;
  // console.log(adminData?.profileImage);

  useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        name: adminData?.fullName,
        email: adminData?.email,
        dob: dayjs(adminData?.dob, 'YYYY-MM-DD'),
        contact: adminData?.contact,
      });
      adminData?.image && setImgURL(refactorFileUrl(adminData?.image));
    }
  }, [form, adminData]);



  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    // console.log("Date:", dayjs(values?.dob).format("YYYY-MM-DD"));
    try {
      const formData = new FormData();
      values?.name && formData.append("name", values?.name);
      values?.dob && formData.append("dob",dayjs(values?.dob).format("YYYY-MM-DD"));
      values?.contact && formData.append("contact", values?.contact);

      if (file) {
        formData.append("image", file);
      }

      const response = await updateAdminProfile({ formData, id: adminData?._id });
      // const response = await updateAdminProfile();

      if (response?.data) {
        toast.success("Success updating form:", response?.data?.message);
        refetch();
      } else {
        toast.error("Error updating form:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex bg-white p-10 mt-10 rounded-2xl border gap-10 w-full">
        {/* Profile Picture */}
        <div>
          <div className="gap-10 px-20 py-1 rounded-xl ">
            <input
              onChange={onChangeImage}
              type="file"
              className="hidden"
              ref={imageInputRef}
            />
            <div
              onClick={() => imageInputRef.current.click()}
              className="relative w-48 h-48 cursor-pointer rounded-full border border-gray-700 bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${imgURL || ProfileImg})` }}
            >
              <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate
                  size={20}
                  className="text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-8/12">
          {/* Input Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="grid grid-cols-1 gap-5">
              <Form.Item
                name="name"
                label="Your Name"
              >
                <Input className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
              >
                <Input readOnly className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Date of Birth"
              >
                <DatePicker className="py-3 bg-gray-100 w-full rounded-xl" />
                {/* <DatePicker onChange={onChange} className="py-3 bg-gray-100 rounded-xl" /> */}
              </Form.Item>

              {/* <Form.Item
                  name="permanentAddress"
                  label="Permanent Address"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item> */}
              {/* <Form.Item
                  name="postalCode"
                  label="Postal Code"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item> */}
              {/* <Form.Item
                  name="username"
                  label="User Name"
                >
                  <Input readOnly placeholder="exampla@deliverly.com" className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item> */}

              {/* <Form.Item
                name="contact"
                label="Contact"
              >
                <Input placeholder="Add your phone number" className="py-3 bg-gray-100 rounded-xl" />
              </Form.Item> */}

              {/* <Form.Item
                  name="presentaddress"
                  label="Present Address"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
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
                    background: "#000000",
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
    </div>
  );
};

export default PersonalInfo;
