import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <HStack
        p={4}
        shadow={"base"}
        color={"white"}
        bgColor={"blackAlpha.900"}
        gap={4}
      >
        <Button variant={"unstyled"} _hover={{ color: "whiteAlpha.700" }}>
          <Link to="/">Home</Link>
        </Button>
        <Button variant={"unstyled"} _hover={{ color: "whiteAlpha.700" }}>
          <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} _hover={{ color: "whiteAlpha.700" }}>
          <Link to="/coins">Coins</Link>
        </Button>
      </HStack>
    </nav>
  );
};
export default Header;
