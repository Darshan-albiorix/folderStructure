import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SubFolder from "./SubFolder";

function Folder() {
  console.log("render");
  const [folderName, setFolderName] = useState({
    id: "",
    type: "folder",
    name: "",
    children: [],
  });
  const [folderArray, setFolderArray] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFolderArray([...folderArray, folderName]);
    setFolderName({
      id: "",
      type: "",
      name: "",
      children: [],
    });
  };

  return (
    <div>
      <div>
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
            <button type="submit">add</button>
            <button type="button">Delete</button>
          </div>
        </form>
      </div>

      {folderArray.map((item) => {
        return (
          <SubFolder
            name={item.name}
            id={item.id}
            children={item.children}
            folderArray={folderArray}
            setFolderArray={setFolderArray}
            key={item.id}
          />
        );
      })}
      {/* <textarea disabled style={{ marginTop: "10px", marginLeft: "4px" }}>
        {JSON.stringify(folderArray)}
      </textarea> */}
    </div>
  );
}

export default Folder;
