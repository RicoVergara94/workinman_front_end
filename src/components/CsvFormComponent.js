import React, { useState } from "react";

export default function CsvFormComponent(props) {
  const [selectedCsvFile, setSelectedCsvFile] = useState(null);
  const [username, setUsername] = useState(props.username);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedCsvFile);
    // const boundary = await uuidv4();
    const formData = new FormData();
    formData.append("csvFile", selectedCsvFile);
    formData.append("username", username);

    // formData.append("image", selectedFile, {
    //   contentType: "image/*",
    //   boundary: boundary,
    // });
    // console.log("this is boundary : " + boundary);

    const res = await fetch("http://localhost:3232/upload-csv", {
      method: "post",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    });
    // if (res.status === 200) {
    //   const text = await res.text();
    //   const success = document.getElementById("file-success");
    //   success.innerText = text;

    //   success.style.padding = "16px";
    //   success.style.backgroundColor = "#dff0d8";
    //   success.style.border = "1px solid #d6e9c6";
    //   success.style.color = "#3c763d";
    //   success.style.borderRadius = "4px";
    //   success.style.marginBottom = "16px";
    // } else if (res.status === 500) {
    //   const error = document.getElementById("file-error");
    //   error.innerText = await res.text();
    //   error.style.color = "red";
    // }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("inside file change component");

    setSelectedCsvFile(file);
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
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="file">Select an csv file to upload:</label>
        <input
          type="file"
          name="csvFile"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      <p id="file-success"></p>
      <p className="error-message" id="file-error"></p>
    </>
  );
}
