import {
  Box,
  Button,
  VStack,
  Collapse,
  IconButton,
  useDisclosure,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box mb={5}>
      <Flex
        minH={"20"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.200"
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <Text fontSize="xl" fontWeight="bold">
              PERFIL
            </Text>
          </Link>
        </Flex>

        {!currentUser && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {/* <Button
              display={{ base: "none", md: "inline-flex" }}
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
            >
              <Link to="/login">Login</Link>
            </Button> */}
            <Link to="/login">
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                // color={"white"}
                colorScheme="blue"
                variant="outline"
                href={"#"}
                _hover={{
                  bg: "blue.300",
                  color: "white",
                }}
              >
                Login
              </Button>
            </Link>

            {/* <Link to="/register">
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                // color={"white"}
                colorScheme="blue"
                variant="outline"
                href={"#"}
                _hover={{
                  bg: "blue.300",
                  color: "white",
                }}
              >
                Register
              </Button>
            </Link> */}
          </Stack>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const MobileNav = () => {
  const { currentUser } = useAuth();
  return (
    <Stack p={4} boxShadow="lg" display={{ md: "none" }}>
      {!currentUser && (
        <VStack align="left">
          {/* <Link to="/login">
            <Text fontWeight={600} color="gray.600">
              Login
            </Text>
          </Link> */}
          <Link to="/login">
            <Text fontWeight={600} color="gray.600">
              Login
            </Text>
          </Link>
          {/* <Link to="/register">
            <Text fontWeight={600} color="gray.600">
              Register
            </Text>
          </Link> */}
        </VStack>
      )}
    </Stack>
  );
};

export default Navbar;
