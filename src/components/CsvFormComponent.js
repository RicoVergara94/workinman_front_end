import React, { useState } from "react";

export default function CsvFormComponent(props) {
  const [selectedCsvFile, setSelectedCsvFile] = useState(null);
  const [username, setUsername] = useState(props.username);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("csvFile", selectedCsvFile);
    formData.append("username", username);

    const res = await fetch("http://localhost:3232/upload-csv", {
      method: "post",
      body: formData,
      headers: {},
    });
    if (res.status === 200) {
      const text = await res.text();
      const success = document.getElementById("file-success-container");
      success.innerText = text;

      success.style.padding = "16px";
      success.style.backgroundColor = "#dff0d8";
      success.style.border = "1px solid #d6e9c6";
      success.style.color = "#3c763d";
      success.style.borderRadius = "4px";
      success.style.marginBottom = "16px";
      const error = document.getElementById("file-error");
      error.innerText = "";
    } else if (res.status === 400) {
      const error = document.getElementById("file-error");
      error.innerText = await res.text();
      error.style.color = "red";
      const success = document.getElementById("file-success-container");
      success.innerHTML = "";
      success.innerText = "";
      success.style = "";
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedCsvFile(file);
  };

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
      <div id="file-success-container">
        <p id="file-success"></p>
      </div>
      <div id="file-error-container">
        <p className="error-message" id="file-error"></p>
      </div>

      <div>
        <p>
          <strong>How to structure your csv file</strong>
        </p>
        <ul>
          <li>
            The Column Headers preferably should be labeled as such and in this
            order:
            <ul>
              <li>Question ID</li>
              <li>Question Text</li>
              <li>Correct Answer</li>
              <li>Incorrect Answer 1</li>
              <li>Incorrect Answer 2</li>
              <li>Incorrect Answer 3</li>
              <li>Difficulty Level</li>
              <li>Image File Name</li>
            </ul>
          </li>
          <p className="break"></p>
          <li>
            Be sure the 'Image File Name' is the same on the csv file as the
            name of the image uploaded inluding the format it is in e.g.
            "George_Washington.jpeg"
          </li>
          <p id="csv-file-example-break">
            <strong>
              Example of a correctly structured and formatted csv file:
            </strong>
          </p>
          <img src="/csv_example.png"></img>
        </ul>
      </div>
    </>
  );
}
