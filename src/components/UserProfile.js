import React, { useState } from "react";
import CsvFormComponent from "./CsvFormComponent";
import ImageFormComponent from "./ImageFormComponent";
import UploadComponent from "./UploadComponent";
import GameComponent from "./GameComponent";
// Need props with the username and other things
export default function UserProfile(props) {
  const [component, setComponent] = useState(
    <GameComponent username={props.username} />
  );

  const [selectedImages, setSelectedImages] = useState([]);

  const handleGameClick = () => {
    setComponent(<GameComponent username={props.username} />);
  };
  const handleUploadClick = () => {
    setComponent(<UploadComponent username={props.username} />);
  };
  return (
    <>
      <header>
        Welcome {props.username}!
        <nav>
          <ul>
            <li>
              <a onClick={handleGameClick}>Game</a>
            </li>
            <li>
              <a onClick={handleUploadClick}>Upload</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{component}</main>
    </>
  );
}
