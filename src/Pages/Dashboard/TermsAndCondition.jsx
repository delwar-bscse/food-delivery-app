import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("USER");
  const isLoading = false;

  useEffect(() => {
    setContent(content);
  }, [selectedTab]);

  // const {
  //   data: termsAndCondition,
  //   isLoading,
  //   refetch,
  // } = useTermsAndConditionQuery(selectedTab);

  // const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();

  const termsAndCondition = [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src="" alt="Image" />
      </div>
    );
  }

  const termsAndConditionData = termsAndCondition?.content;

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      const res = await updateTermsAndConditions(data).unwrap();
      if (res.success) {
        toast.success("Terms and Conditions updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      throw new Error("Something Is wrong at try");
    }
  };

  const tabContent = {
    USER: termsAndConditionData,
    VENDOR: termsAndConditionData,
    CUSTOMER: termsAndConditionData,
  };

  return (
    <div>
      <div className="mb-4">Terms and Conditions</div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "USER" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("USER")}
        >
          Users
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "VENDOR" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("VENDOR")}
        >
          Vendors
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "CUSTOMER" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("CUSTOMER")}
        >
          Customers
        </button>
      </div>

      <JoditEditor
        ref={editor}
        value={tabContent[selectedTab]}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
