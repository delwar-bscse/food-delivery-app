import { useRef } from "react";
import JoditEditor from "jodit-react";
import { useAboutUsQuery, useUpdateAboutUsMutation } from "../../redux/apiSlices/rulesSlice";
import toast from "react-hot-toast";

function AboutUs() {
  const editor = useRef(null);

  const [updateAboutUs] = useUpdateAboutUsMutation();
  const { data: data, isLoading, refetch } = useAboutUsQuery();

  const handleOnSave = async () => {
    try {
      await updateAboutUs({ content: editor.current.value }).unwrap();
      toast.success("Privacy Policy saved successfully!");
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save Privacy Policy. Please try again.");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="">
      {/* Jodit Editor */}
      <div className="">
        <h1 className="text-2xl font-bold pb-4">Privacy Policy</h1>
        {!isLoading ? <JoditEditor
          ref={editor}
          value={data?.data?.content}
        /> : <div className="h-[600px] flex items-center justify-center">
          <p>Loading...</p>
        </div>}

        <div className="py-4 text-center">
          <button onClick={handleOnSave} className="bg-gray-600 text-white px-8 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
