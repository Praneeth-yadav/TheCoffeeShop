import { Button, Input, InputGroup } from "@chakra-ui/react";
import { storage } from "./Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef, useState } from "react";

export const Uploadimage = ({ name }) => {
  const [image, setimage] = useState(null);

  console.log("name in image", name);

  // Create a storage reference from our storage service
  const storageRef = ref(storage, `images/${name}`);
  function uploadImage() {
    if (image == null) {
      return;
    }
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded image!");
      console.log("snapshot", snapshot);
    });
  }

  return (
    <InputGroup>
      <Input type="file" onChange={(e) => setimage(e.target.files[0])} />
      <Button colorScheme="teal" onClick={uploadImage}>
        upload
      </Button>
    </InputGroup>
  );
};
