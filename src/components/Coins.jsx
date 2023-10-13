import {
  Button,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { server } from "../main.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  const btns = new Array(50).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const changePage = (page) => {
    setLoading(true);
    setPage(page);
    setLoading(false);
  };
  if (error) return <ErrorComponent message="Error while fetching coins" />;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxW={"container.xl"}>
          <RadioGroup value={currency} onChange={setCurrency} p={4}>
            <HStack spacing={4}>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack
            p={5}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={10}
          >
            {coins.map(({ id, name, current_price: price, image, symbol }) => {
              return (
                <Link key={id} to={`/coin/${id}`}>
                  <VStack
                    px={4}
                    py={8}
                    boxShadow={"xl"}
                    w={"13rem"}
                    borderRadius={"0.5rem"}
                    h={"full"}
                    gap={3}
                    flexBasis={"3rem"}
                    cursor={"pointer"}
                    transition={"0.2s all ease-in-out"}
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    <Image w={10} src={image} />
                    <Text fontSize={"lg"} fontWeight={500}>
                      {symbol}
                    </Text>
                    <Text>{name}</Text>
                    <Text>
                      {currency == "usd" && "$"}
                      {currency == "inr" && "₹"}
                      {currency == "eur" && "€"}
                      {price}
                    </Text>
                  </VStack>
                </Link>
              );
            })}
          </HStack>
          <HStack
            p={8}
            overflow={"auto"}
            bgColor={"blackAlpha.300"}
            borderRadius={"1rem"}
          >
            {btns.map((btn, index) => (
              <Button
                key={index}
                variant={"solid"}
                colorScheme={"pink"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </Container>
      )}
    </>
  );
};
export default Coins;
