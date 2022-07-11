import "./App.css";
import Folder from "./components/folder";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Folder Structure</h1>
      <div style={{ marginLeft:"4px" , marginBottom:"4px" }}>
        <button>Add folder to root</button>
      </div>
      <Folder />
    </div>
  );
}

export default App;
