import { Alert, AlertIcon, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorComponent = ({ message }) => {
  return (
    <Stack h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Alert
        status="error"
        position={"fixed"}
        bottom={4}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <AlertIcon />
        {message}
      </Alert>
      <Button colorScheme={"pink"}>
        <Link to="/">Back To Home</Link>
      </Button>
    </Stack>
  );
};
export default ErrorComponent;
