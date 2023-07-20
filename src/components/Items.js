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
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const Items = ({ props, name }) => {
  // console.log("Card props", props);
  // console.log("Card props item", props.item);
  // console.log("user logged", name);
  ///TODO
  // const [desc, setdesc] = useState(props.desc);
  // const [price, setprice] = useState(props.price);
  // const [qty, setqty] = useState(props.quantity);
  const desc = useRef(props.desc);
  const price = useRef(props.price);
  const qty = useRef(props.quantity);
  function handledesc(e) {
    console.log("set desc ", e.target.value);
    desc.current = e.target.value;
  }
  function handleprice(e) {
    console.log("set price ", e.target.value);
    price.current = e.target.value;
  }
  function handleqty(e) {
    console.log("set qty ", e.target.value);
    qty.current = e.target.value;
  }

  console.log("checking state ", props.id, "  ", desc, "  ", price, "  ", qty);
  function handleChange({ target }) {
    console.log("onchange", target);
    this.setState({
      [target.name]: target.value,
    });
  }
  function deleteItem() {
    console.log("Delete item   =   ", props);
  }
  function updateItem() {
    console.log("Update item    =   ", props);
  }
  function Bodytype({ user }) {
    if (user) {
      return (
        <>
          <Text>{props.desc}</Text>
          <Text color="green.500" fontSize="l">
            Available quanity {props.quantity}
          </Text>
          <Text color="blue.600" fontSize="2xl">
            ${props.price}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Input
            focusBorderColor="lime"
            variant="outline"
            name="description"
            defaultValue={props.desc}
            onChange={handledesc}
          />

          <InputGroup>
            <InputLeftAddon children="Available Quantity" />
            <Input
              focusBorderColor="lime"
              type="tel"
              name="quantity"
              defaultValue={props.quantity}
              onChange={handleqty}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input
              focusBorderColor="lime"
              name="price"
              type="tel"
              defaultValue={props.price}
              onChange={handleprice}
            />
          </InputGroup>
        </>
      );
    }
  }
  function Buttontype({ user }) {
    //console.log("inside user function", user);
    if (user) {
      return (
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => updateItem()}
          >
            Update
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => deleteItem()}
          >
            Delete Item
          </Button>
        </ButtonGroup>
      );
    }
  }

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.item}</Heading>
          <Bodytype user={name != "Admin"} />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Buttontype user={name != "Admin"} />
      </CardFooter>
    </Card>
  );
};
