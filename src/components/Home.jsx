import { Box, Heading, Image, VStack, keyframes } from "@chakra-ui/react";
import img from "../assets/bitcoin.png";

const animation = keyframes`
    to{
    transform:translateY(12px)
    }
`;
const Home = () => {
  const myAnimation = `${animation} infinite 1.5s`;
  return (
    <VStack
      gap={["1.6rem", "2rem", "0.8rem"]}
      pb={"20rem"}
      color={"white"}
      bgColor={"blackAlpha.900"}
    >
      <Image
        src={img}
        w={["50%", "40%"]}
        hueRotate="rotate(20deg)"
        animation={myAnimation}
        filter={"grayScale(1)"}
        css={{
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
      <Heading marginTop={["-4.5rem", "-5.5rem"]} fontSize={["5xl", "6xl"]}>
        YCrypto
      </Heading>
    </VStack>
  );
};
export default Home;
