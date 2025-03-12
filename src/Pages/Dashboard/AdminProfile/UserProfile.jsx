import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  useFetchAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "../../../redux/apiSlices/authSlice";
import logo from "../../../assets/randomProfile2.jpg";
import toast from "react-hot-toast";
import rentMeLogo from "../../../assets/navLogo.png";
import { ProfileImg } from "../../../assets/assets";
import { imageUrl } from "../../../redux/api/baseApi";
import moment from "moment/moment";

const baseUrl = import.meta.env.VITE_BASE_URL;

const PersonalInfo = () => {
  const [contact, setContact] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();


  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // const isLoading = false;

  const { data: fetchAdminProfile, isLoading, refetch } = useFetchAdminProfileQuery();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();

  // const fetchAdminProfile = [];

  const adminData = fetchAdminProfile?.data;
  console.log(adminData?.profileImage);

  useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        name: adminData?.fullName,
        email: adminData?.email,
        dob: adminData?.dob ? moment(adminData?.dob) : null,
        permanentAddress: adminData?.permanentAddress,
        postalCode: adminData?.postalCode,
        username: adminData?.username,
      });
      // adminData?.profileImage && setImgURL(adminData?.profileImage?.startsWith("http") ? adminData?.profileImage : `${imageUrl}${adminData?.profileImage}`);
    }
  }, [form, adminData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const formData = new FormData();
      values?.name && formData.append("name", values?.name);
      values?.dob && formData.append("dob", values?.dob);
      values?.permanentAddress && formData.append("permanentAddress", values?.permanentAddress);
      values?.postalCode && formData.append("postalCode", values?.postalCode);
      values?.username && formData.append("username", values?.username);

      // if (file) {
      //   formData.append("image", file);
      // } else {
      //   formData.append("image", imgURL);
      // }

      const response = await updateAdminProfile({formData, id: adminData?._id});
      // const response = await updateAdminProfile();

      if (response?.data) {
        toast.success("Success updating form:",response?.data?.message);
        refetch();
      } else {
        toast.error("Error updating form:",response?.data?.message);
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
          <div className="flex flex-col items-center gap-10 px-20 py-12 rounded-xl justify-center">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="relative w-48 h-48 cursor-pointer rounded-full border border-gray-700 bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${imgURL ? imgURL : ProfileImg})` }}
            >
              <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate
                  size={20}
                  className="text-gray-700"
                />
              </div>
            </label>
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
            <div className="grid grid-cols-2 gap-5">
              {/* Form Column One */}
              <div>
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
                  <Input disabled className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>

                <Form.Item
                  name="dob"
                  label="Date of Birth"
                >
                  <DatePicker className="py-3 bg-gray-100 w-full rounded-xl" />
                  {/* <DatePicker onChange={onChange} className="py-3 bg-gray-100 rounded-xl" /> */}
                </Form.Item>

                <Form.Item
                  name="permanentAddress"
                  label="Permanent Address"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>
                <Form.Item
                  name="postalCode"
                  label="Postal Code"
                >
                  <Input className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>
              </div>
              {/* Form Column One */}
              <div>
                <Form.Item
                  name="username"
                  label="User Name"
                >
                  <Input placeholder="exampla@deliverly.com" className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>

                <Form.Item
                  name="contact"
                  label="Contact"
                >
                  <Input placeholder="Add your phone number" className="py-3 bg-gray-100 rounded-xl" />
                </Form.Item>
                <Form.Item
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
                </Form.Item>
              </div>
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
