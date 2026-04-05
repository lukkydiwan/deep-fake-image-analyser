import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/analyze", formData);
    setResult(res.data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Deepfake Analyzer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleUpload}>Analyze</button>

      {result && (
        <div>
          <h2>{result.label}</h2>
          <p>Confidence: {result.confidence.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;