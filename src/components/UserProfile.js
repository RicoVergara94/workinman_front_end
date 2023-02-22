import React, { useState } from "react";
import CsvFormComponent from "./CsvFormComponent";
import ImageFormComponent from "./ImageFormComponent";
// Need props with the username and other things
export default function UserProfile(props) {
  //   const [component, setComponent] = useState();

  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <>
      <header>Welcome {props.username}!</header>
      <main>
        <div>
          <ImageFormComponent username={props.username} />
        </div>
        <div>
          <CsvFormComponent username={props.username} />
        </div>
        {/* {component} */}
      </main>
    </>
  );
}
