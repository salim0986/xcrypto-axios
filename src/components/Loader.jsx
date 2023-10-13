import { Spinner, Stack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Stack
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner size={"xl"} />
    </Stack>
  );
};
export default Loader;
