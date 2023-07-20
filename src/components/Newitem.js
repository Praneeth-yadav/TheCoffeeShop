import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import Newitemstyle from "./Newitem.module.css";

export const Newitem = () => {
  return (
    <>
      <div className={Newitemstyle.iteminput}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftAddon children="Item Name" />
            <Input type="text" placeholder="Add Name" />
          </InputGroup>
          <Select placeholder="Select Category">
            <option value="dessert">dessert</option>
            <option value="coffee">coffee</option>
            <option value="savoury">savoury</option>
          </Select>
          <InputGroup>
            <InputLeftAddon children="Description" />
            <Input type="text" placeholder="Add description" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Available Quantity" />
            <Input type="text" placeholder="Quantity" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children="Available Quantity" /> */}
            <Input type="file" />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon children="$" />
            <Input placeholder="Price" />
          </InputGroup>
          <Button colorScheme="teal">Add Item</Button>
        </Stack>
      </div>
    </>
  );
};
