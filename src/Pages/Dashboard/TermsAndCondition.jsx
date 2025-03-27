import { useState, useRef } from "react";
import JoditEditor from "jodit-react";

function TermsAndCondition() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="grid grid-cols-4 gap-4">

      {/* Jodit Editor */}
      <div className="col-span-3">
        <h1 className="text-2xl font-bold pb-4">Terms & Conditions</h1>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        <div className="py-4 text-center">
          <button className="bg-gray-600 text-white px-8 py-2 rounded-md">Save</button>
        </div>
      </div>

      {/* Display the content from Jodit Editor */}
      <div className="">
        <h2 className="text-2xl font-semibold pb-2">Preview</h2>
        <div
          className="jodit_preview mt-2 border border-gray-200 bg-white h-[650px] overflow-y-auto p-2"
          dangerouslySetInnerHTML={{ __html: content }} // Render HTML content
        />
      </div>
    </div>
  );
}

export default TermsAndCondition;
