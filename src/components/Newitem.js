import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { getStorage } from "firebase/storage";
import { useCallback, useRef, useState } from "react";
import Newitemstyle from "./Newitem.module.css";
import { Uploadimage } from "./Uploadimage";

const api = axios.create({
  baseURL: "http://localhost:4027",
});

export const Newitem = () => {
  const [itemname, setitemname] = useState(null);
  const desc = useRef(null);
  const price = useRef(null);
  const qty = useRef(null);
  const category = useRef(null);
  const imageurl = useRef(null);
  const storage = getStorage();
  const imgurl = useCallback(
    (murl) => {
      console.log("url is - ", murl);
      imageurl.current = murl;
    },
    [imageurl]
  );
  const checkimage = () => {
    if (imageurl.current == null) {
      return true;
    }
    return false;
  };

  const additem = async () => {
    // const imgurl = await fetchurl();

    // if (imageurl==null) {
    //   console.log("Retrying to fetch image url...");
    //   const retryURLFetched = await fetchurl();

    //   if (!retryURLFetched) {
    //     console.log("Still unable to fetch image url. Aborting item addition.");
    //     alert("Item cannot be added. Try Again");
    //     return;
    //   }
    // }
    /////////////
    // while (imageurl.current == null) {
    //   console.log("in while");
    //   console.log("image current-1-", imageurl.current);
    //   setTimeout(() => {
    //     console.log(" process inprogress!");
    //   }, 9000);
    //   await getDownloadURL(ref(storage, `images/${itemname}`))
    //     .then((url) => {
    //       imageurl.current = url;
    //       console.log("image url current", imageurl.current);
    //     })
    //     .catch((error) => {
    //       console.log("Error retreiving image url", error);
    //     });
    //   console.log("image current-2-", imageurl.current);
    // }
    const data = { desc, price, qty, category, imageurl, storage };
    console.log("item to be added -  ", data);
    const res = async () => {
      api.post("/", {
        desc: desc.current,
        price: price.current,
        qty: qty.current,
        category: category.current.value,
        imageurl: imageurl.current,
      });
    };
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
            onChange={(e) => {
              console.log("category", e.target.value);
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
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                qty.current = e.target.value;
              }}
            />
          </InputGroup>
          {itemname !== null && itemname !== "" ? (
            <Uploadimage name={itemname} imgurl={imgurl} />
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
          <Button disabled={true} colorScheme="teal" onClick={additem}>
            Add Item
          </Button>
        </Stack>
      </div>
    </>
  );
};
