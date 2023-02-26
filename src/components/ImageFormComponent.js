import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ImageFormComponent(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState(props.username);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("username", username);

    const res = await fetch("http://localhost:3232/upload-image", {
      method: "post",
      body: formData,
      headers: {},
    });
    if (res.status === 200) {
      const text = await res.text();
      const success = document.getElementById("image-success-container");
      success.innerText = text;
      success.style.padding = "16px";
      success.style.backgroundColor = "#dff0d8";
      success.style.border = "1px solid #d6e9c6";
      success.style.color = "#3c763d";
      success.style.borderRadius = "4px";
      success.style.marginBottom = "16px";

      const error = document.getElementById("image-error");

      error.innerHTML = "";
    } else if (res.status === 400) {
      const error = document.getElementById("image-error");
      error.innerText = await res.text();
      error.style.color = "red";
      const success = document.getElementById("image-success-container");
      success.innerHTML = "";
      success.innerText = "";
      success.style = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multitype/form-data">
        <div>
          <label htmlFor="image">Select an image to upload:</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div id="image-success-container">
        <p id="image-success"></p>
      </div>
      <div id="image-error-container">
        <p className="error-message" id="image-error"></p>
      </div>
    </>
  );
}
