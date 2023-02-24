import React, { useState } from "react";
import ImageFormComponent from "./ImageFormComponent";
import CsvFormComponent from "./CsvFormComponent";

export default function UploadComponent(props) {
  const [username, setUsername] = useState(props.username);

  return (
    <>
      <div>
        <ImageFormComponent username={props.username} />
      </div>
      <div>
        <CsvFormComponent username={props.username} />
      </div>
    </>
  );
}
