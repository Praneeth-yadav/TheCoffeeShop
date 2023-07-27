import { Navbar } from "./Navbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

import { useLocation } from "react-router-dom";
const Cartpage = () => {
  const response = {
    data: [
      {
        id: "1",
        item: "expresso1",
        quantity: "2",
        price: "230",
      },
      {
        id: "2",
        item: "expresso2",
        quantity: "2",
        price: "230",
      },
      {
        id: "3",
        item: "expresso3",
        quantity: "2",
        price: "230",
      },
      {
        id: "4",
        item: "pastry4",
        quantity: "5",
        price: "230",
      },
      {
        id: "5",
        item: "pastry5",
        quantity: "6",
        price: "230",
      },
      {
        id: "6",
        item: "savoury2",
        quantity: "2",
        price: "230",
      },
    ],
  };
  const responsefull = [
    {
      user: "User",
      data: [
        {
          id: "1",
          item: "expresso1",
          quantity: "2",
          price: "230",
        },
        {
          id: "2",
          item: "expresso2",
          quantity: "2",
          price: "230",
        },
        {
          id: "3",
          item: "expresso3",
          quantity: "2",
          price: "230",
        },
        {
          id: "4",
          item: "pastry4",
          quantity: "5",
          price: "230",
        },
        {
          id: "5",
          item: "pastry5",
          quantity: "6",
          price: "230",
        },
        {
          id: "6",
          item: "savoury2",
          quantity: "2",
          price: "230",
        },
      ],
    },
    {
      user: "Praneeth",
      data: [
        {
          id: "1",
          item: "expresso1",
          quantity: "2",
          price: "230",
        },
        {
          id: "3",
          item: "expresso3",
          quantity: "2",
          price: "230",
        },
        {
          id: "4",
          item: "pastry4",
          quantity: "5",
          price: "230",
        },

        {
          id: "6",
          item: "savoury2",
          quantity: "2",
          price: "230",
        },
      ],
    },
  ];
  const location = useLocation();
  console.log("state in cart", location);
  const total = useRef(0);
  const [showtotal, setshowtotal] = useState(false);
  const Cart = () => {
    if (location.state.name !== "Admin") {
      return (
        <>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setshowtotal(true);
                  }}
                >
                  Proceed To Checkout
                </Button>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Quantity</Th>
                  <Th>Price/Unit</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {response.data.map((data) => {
                  total.current = total.current + data.price * data.quantity;
                  return (
                    <>
                      <Tr>
                        <Td>{data.item}</Td>
                        <Td>{data.quantity}</Td>
                        <Td>${data.price}</Td>
                        <Td>${data.price * data.quantity}</Td>
                        <Td>
                          <Tooltip label="Delete Item">
                            <IconButton
                              isRound={true}
                              variant="outline"
                              colorScheme="red"
                              aria-label="Delete"
                              fontSize="20px"
                              icon={<DeleteIcon />}
                            />
                          </Tooltip>
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  {showtotal && (
                    <h1>
                      <b>Total : {total.current}</b>
                    </h1>
                  )}
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      );
    }else{
      
    }
  };
  return (
    <>
      <Navbar name={location.state.name} />
      <div>
        <Cart />
      </div>
    </>
  );
};
export default Cartpage;
