import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useRef, useState } from "react";
import Newitemstyle from "./Newitem.module.css";
import { Uploadimage } from "./Uploadimage";

export const Newitem = () => {
  const [itemname, setitemname] = useState(null);
  const desc = useRef(null);
  const price = useRef(null);
  const qty = useRef(null);
  const category = useRef(null);
  const imageurl = useRef(null);
  const storage = getStorage();
  // console.log("item", itemname, " ", desc, price, qty, category, url);
  const additem = () => {
    getDownloadURL(ref(storage, `images/${itemname}`))
      .then((url) => {
        console.log("image url", url);
        imageurl.current = url;
      })
      .catch((error) => {
        // Handle any errors
        console.log("Error retreiving image url");
      });
  };
  return (
    <>
      <div className={Newitemstyle.iteminput}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftAddon children="Item Name" />
            <Input
              type="text"
              placeholder="Add Name"
              onChange={(e) => {
                setitemname(e.target.value);
              }}
            />
          </InputGroup>
          <Select
            placeholder="Select Category"
            onClick={(e) => {
              category.current = e.target.value;
            }}
          >
            <option value="dessert">dessert</option>
            <option value="coffee">coffee</option>
            <option value="savoury">savoury</option>
          </Select>
          <InputGroup>
            <InputLeftAddon children="Description" />
            <Input
              type="text"
              placeholder="Add description"
              onChange={(e) => {
                desc.current = e.target.value;
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Available Quantity" />
            <Input
              type="text"
              placeholder="Quantity"
              onChange={(e) => {
                qty.current = e.target.value;
              }}
            />
          </InputGroup>
          {itemname !== null && itemname !== "" ? (
            <Uploadimage name={itemname} />
          ) : (
            <></>
          )}
          <InputGroup size="sm">
            <InputLeftAddon children="$" />
            <Input
              placeholder="Price"
              onChange={(e) => {
                price.current = e.target.value;
              }}
            />
          </InputGroup>
          <Button colorScheme="teal" onClick={additem}>
            Add Item
          </Button>
        </Stack>
      </div>
    </>
  );
};
