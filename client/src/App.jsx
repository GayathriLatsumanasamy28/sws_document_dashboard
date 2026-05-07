import { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState({});

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    for (let file of files) {
      const formData = new FormData();
      formData.append("files", file);

      setStatus((prev) => ({
        ...prev,
        [file.name]: "Uploading",
      }));

      try {
        await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) /
                progressEvent.total
              );

              setProgress((prev) => ({
                ...prev,
                [file.name]: percent,
              }));
            },
          }
        );

        setStatus((prev) => ({
          ...prev,
          [file.name]: "Completed",
        }));
      } catch (error) {
        console.log(error);

        setStatus((prev) => ({
          ...prev,
          [file.name]: "Failed",
        }));
      }
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
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

      <div style={{ marginTop: "30px" }}>
        {files.map((file) => (
          <div
            key={file.name}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <p>
              <strong>Name:</strong> {file.name}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {(file.size / 1024).toFixed(2)} KB
            </p>

            <p>
              <strong>Type:</strong> {file.type}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {status[file.name] || "Pending"}
            </p>

            <div
              style={{
                width: "100%",
                background: "#ddd",
                height: "20px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress[file.name] || 0}%`,
                  background: "blue",
                  height: "100%",
                }}
              />
            </div>

            <p>{progress[file.name] || 0}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;