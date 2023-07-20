import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Uploadimage } from "./Uploadimage";
import Newitemstyle from "./Newitem.module.css";
import { useRef } from "react";

export const Newitem = () => {
  const Itemname = useRef(null);
  const desc = useRef(null);
  const price = useRef(null);
  const qty = useRef(null);
  const category = useRef(null);
  console.log("item", Itemname, " ", desc, price, qty, category);
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
                Itemname.current = e.target.value;
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
          {<Uploadimage name={Itemname.current} />}
          <InputGroup size="sm">
            <InputLeftAddon children="$" />
            <Input
              placeholder="Price"
              onChange={(e) => {
                price.current = e.target.value;
              }}
            />
          </InputGroup>
          <Button colorScheme="teal">Add Item</Button>
        </Stack>
      </div>
    </>
  );
};
