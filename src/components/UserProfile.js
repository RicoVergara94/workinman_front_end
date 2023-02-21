import React, { useState } from "react";
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
          <ImageFormComponent />
        </div>
        {/* {component} */}
      </main>
    </>
  );
}
