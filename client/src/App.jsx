import { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      alert("Files uploaded successfully");

      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Document Dashboard</h1>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileChange}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Files
      </button>
    </div>
  );
}

export default App;