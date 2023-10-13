import { Box, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <Stack
        direction={["column", "column", "row"]}
        gap={5}
        py={8}
        px={16}
        bgColor={"blackAlpha.900"}
        color={"whiteAlpha.700"}
        justifyContent={"space-between"}
      >
        <VStack alignItems={"flex-start"}>
          <Heading fontSize={"lg"}>About US</Heading>
          <Text>
            We are the best crypto trading brand of India. We provide quality
            with simplicity.
          </Text>
        </VStack>
        <VStack>
          <Box border={"1px solid white"} p={4} borderRadius={"full"}>
            <BsFillPersonFill size={"3rem"} />
          </Box>
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </footer>
  );
};
export default Footer;
