import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ImageFormComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const boundary = await uuidv4();
    const formData = new FormData();
    formData.append("image", selectedFile);

    // formData.append("image", selectedFile, {
    //   contentType: "image/*",
    //   boundary: boundary,
    // });
    // console.log("this is boundary : " + boundary);

    const res = await fetch("http://localhost:3232/upload-image", {
      method: "post",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      const text = await res.text();
      const success = document.getElementById("image-success");
      success.innerText = text;

      success.style.padding = "16px";
      success.style.backgroundColor = "#dff0d8";
      success.style.border = "1px solid #d6e9c6";
      success.style.color = "#3c763d";
      success.style.borderRadius = "4px";
      success.style.marginBottom = "16px";
    } else if (res.status === 500) {
      const error = document.getElementById("image-error");
      error.innerText = await res.text();
      error.style.color = "red";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  //   const submit = async event => {
  //     event.preventDefault()
  //     const result = await postImage({image: file, description})
  //     setImages([result.image, ...images])
  //   }

  //   const fileSelected = event => {
  //     const file = event.target.files[0]
  // 		setFile(file)
  // 	}
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
      <p id="image-success"></p>
      <p className="error-message" id="image-error"></p>
    </>
  );
}

{
  /* <form onSubmit={submit}>
<input onChange={fileSelected} type="file" accept="image/*"></input>
<button type="submit">Submit</button>
</form> */
}
