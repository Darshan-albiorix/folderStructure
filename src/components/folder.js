import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SubFolder from "./SubFolder";

function Folder() {
  const [folderName, setFolderName] = useState({
    id: "",
    type: "folder",
    name: "",
    children: [],
  });
  const [folderArray, setFolderArray] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFolderArray([...folderArray, folderName]);
    setFolderName({
      id: "",
      type: "",
      name: "",
      children: [],
    });
    setToggle(false);
  };

  return (
    <div>
      <div>
        <div style={{ marginLeft: "4px", marginBottom: "4px" }}>
          <button onClick={() => setToggle(true)}>Add folder to root</button>
        </div>
      </div>
      {folderArray.map((item) => {
        return (
          <SubFolder
            folder={item}
            folderArray={folderArray}
            setFolderArray={setFolderArray}
            key={item.id}
          />
        );
      })}
      {toggle && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", marginLeft: "4px" }}
        >
          <input
            type="text"
            value={folderName.name}
            onChange={(e) =>
              setFolderName({
                ...folderName,
                name: e.target.value,
                id: uuidv4(),
              })
            }
          />
          <div>
            <button type="submit" disabled={!folderName.name} style={{margin:"0 2px"}}>add</button>
            <button type="button" onClick={() => setToggle(false)}>
              Delete
            </button>
          </div>
        </form>
      )}

      <p style={{ marginTop: "10px", marginLeft: "4px", width:"450px", height:"250px", overflow:"auto", border:"1px solid black" }}>
        {JSON.stringify(folderArray)}
      </p>
    </div>
  );
}

export default Folder;
