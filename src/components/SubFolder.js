import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function SubFolder({ folder, folderArray, setFolderArray }) {
  const [subToggle, setSubToggle] = useState(false);
  const [showInnerInput, setShowInnerInput] = useState(false);
  const [subFolderData, setSubFolderData] = useState({
    id: "",
    type: "",
    name: "",
    children: [],
  });

  const [subFolder, setSubFolder] = useState([]);
  const deleteHandler = (value) => {
    const a = folderArray.filter((item) => item.id !== value);
    setFolderArray(a);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubFolderData({ ...subFolderData, id: uuidv4() });
    if (subFolderData.name) {
      setFolderArray((prev) => {
        folder.children.push(subFolderData);
        return [...prev];
      });
      setSubFolder([...subFolder, subFolderData]);
    }
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
        {folder.type === "file" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="black"
                      width="25"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      stroke="yellow"
                      stroke-width="2"
                      width="25"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  )}
          <h5>{folder.name}</h5>
         {folder.type !== "file"  && <svg
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
          </svg>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            style={{ width: "20px" }}
            onClick={() => deleteHandler(folder.id)}
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
            <button
              onClick={() => {
                setSubFolderData({ ...subFolderData, type: "file" });
                setShowInnerInput(true);
                setSubToggle(false);
              }}
            >
              file
            </button>
            <button
              onClick={() => {
                setSubFolderData({ ...subFolderData, type: "folder" });
                setShowInnerInput(true);
                setSubToggle(false);
              }}
            >
              folder
            </button>
          </div>
        )}
        {showInnerInput && (
          <div>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              {subFolderData.type === "folder" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ width: "20px", color: "rgb(255,215,0)" }}
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ width: "20px" }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
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

      {subFolder &&
        subFolder.map((item) => (
          <div style={{ marginLeft: "20px" }}>
            <SubFolder
              folder={item}
              folderArray={subFolder}
              setFolderArray={setSubFolder}
              key={item.id}
            />
          </div>
        ))}
    </div>
  );
}

export default SubFolder;
