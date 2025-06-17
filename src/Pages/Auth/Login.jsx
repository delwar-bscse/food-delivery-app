import {  Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onFinish = async (values) => {
    toast.loading("Logging in...", {id: "login"});
    
    try {
      const response = await login(values).unwrap();

      const accessToken = response?.data?.token;

      // console.log("accessToken : ", response?.data?.token);
      if(accessToken){
        toast.success("Login successful!", {id: "login"});
      localStorage.setItem("ivan_authToken", accessToken);
      Cookies.set("ivan_refreshToken", accessToken);
      navigate("/");
      }else{
        toast.error("Login failed. Please try again.", {id: "login"});
      }

    } catch (error) {
      toast.error(error || "Login failed. Please try again !!!", {id: "login"});
      console.error(error);
    }
    toast
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          remember: false, // Default state for the checkbox
        }}
      >
        {/* Email Field */}
        <FormItem
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        />

        {/* Password Field */}
        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item style={{ marginBottom: 0 }}>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 45,
              fontWeight: 400,
              fontSize: 18,
              marginTop: 20,
            }}
            className={`flex items-center justify-center bg-gray-600 text-white rounded-lg`}
          >
            Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
