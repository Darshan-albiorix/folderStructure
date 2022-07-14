import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SubFolder from "./SubFolder";
import { useForm } from "react-hook-form";

function Folder() {
  const [folderName, setFolderName] = useState({
    id: "",
    type: "folder",
    name: "",
    children: [],
  });
  const [folderArray, setFolderArray] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { register, handleSubmit,  formState: { errors }, reset } = useForm();

  const onSubmit = () => {
    setFolderArray([...folderArray, folderName]);
    reset();
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
        onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", marginLeft: "4px" }}
        >
          <input
            type="text"
            {...register("name", { required: true })} 
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
            <button
              type="submit"
              style={{ margin: "0 2px" }}
              >
              add
            </button>
            <button type="button" onClick={() => setToggle(false)}>
              Delete
            </button>
          </div>
        </form>
      )}
      {errors.name && <span style={{marginLeft:"4px", color:"red"}}>Folder name is required</span>}

      <p
        style={{
          marginTop: "10px",
          marginLeft: "4px",
          width: "450px",
          height: "250px",
          overflow: "auto",
          border: "1px solid black",
        }}
      >
        {JSON.stringify(folderArray)}
      </p>
    </div>
  );
}

export default Folder;
