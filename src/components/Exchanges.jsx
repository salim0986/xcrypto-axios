import { useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";
import { Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import ErrorComponent from "./ErrorComponent.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchExchange() {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=250`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    }
    fetchExchange();
  }, []);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxW={"container.xl"}>
          <HStack
            p={5}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={10}
          >
            {exchanges.map(
              ({ id, name, url, image, trust_score_rank: rank }) => {
                return (
                  <a key={id} href={url} target="blank">
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
                        {rank}
                      </Text>
                      <Text>{name}</Text>
                    </VStack>
                  </a>
                );
              }
            )}
          </HStack>
        </Container>
      )}
    </>
  );
};
export default Exchanges;
