import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function SubFolder(props) {
  console.log("props", props.children)
  const [subToggle, setSubToggle] = useState(false);
  const [showInnerInput, setShowInnerInput] = useState(false);
  const [subFolderData, setSubFolderData] = useState({
    id: "",
    type: "folder",
    name: "",
    children: [],
  });

  const deleteHandler = (value) => {
    const a = props.folderArray.filter((item) => item.id !== value);
    props.setFolderArray(a);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.children.push(subFolderData);
    props.setFolderArray(props.folderArray);
    setShowInnerInput(false);
    setSubToggle(false);
    setSubFolderData({
      id: "",
      type: "",
      name: "",
      children: [],
    });
  };

  const cancelInput = () => {
    setShowInnerInput(false);
    setShowInnerInput(false);
  };

  return (
    <div style={{ marginLeft: "4px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ width: "20px", color: "rgb(255,215,0)" }}
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <h5>{props.name}</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            style={{ width: "20px" }}
            onClick={() => setSubToggle(true)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            style={{ width: "20px" }}
            onClick={() => deleteHandler(props.id)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        {subToggle && !showInnerInput && (
          <div>
            <button onClick={() => setShowInnerInput(true)}>file</button>
            <button>folder</button>
          </div>
        )}
        {showInnerInput && (
          <div >
            <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center"}}>
              <span>
                <input
                  type="text"
                  value={subFolderData.name}
                  onChange={(e) =>
                    setSubFolderData({
                      ...subFolderData,
                      name: e.target.value,
                      id: uuidv4(),
                    })
                  }
                />
              </span>
              <div>
                <button type="submit">+</button>
                <button onClick={() => cancelInput()}>-</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {props.children &&
        props.children.map((item) => (
          <div style={{ marginLeft: "20px" }}>
            <SubFolder
              name={item.name}
              id={item.id}
              children={item.children}
              folderArray={props.folderArray}
              setFolderArray={props.setFolderArray}
            />
          </div>
        ))}
    </div>
  );
}

export default SubFolder;
