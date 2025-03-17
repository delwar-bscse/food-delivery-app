import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

function TermsAndCondition() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold pb-4">Terns & Conditions</h1>

      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <div className="py-4 text-center">
        <button className="bg-gray-600 text-white px-8 py-2 rounded-md">Save</button>
      </div>
    </div>
  );
}

export default TermsAndCondition;