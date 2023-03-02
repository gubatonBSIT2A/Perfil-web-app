import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  Stack,
  MenuItem,
  Button,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiChevronDown } from "react-icons/fi";
const UserProfile = () => {
  const { logout, currentUser } = useAuth();
  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems="center">
        {!currentUser && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              display={{ base: "none", md: "inline-flex" }}
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              color='blue.400'
            >
              <Link to="/login">Login</Link>
            </Button>
            {/* <Link to="/register">
              <Button
              colorScheme='blue'
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={400}
                color={"white"}
              
                href={"#"}
                _hover={{
                  bg: "blue.300",
                }}
              >
                Register
              </Button>
            </Link> */}
          </Stack>
        )}
        {
          currentUser && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack spacing="4">
                  <Avatar
                    size="md"
                    src={
                      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1669857333~exp=1669857933~hmac=5c298eaa00cec371263cbc7ac8779776dfa49a0da14ff47607c4aeafcadb6fb6"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{currentUser.email}</Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList fontSize="lg" bg="white" borderColor="gray.200">
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuDivider />
                <Link
                  to="/logout"
                  name="Logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    await logout();
                  }}
                >
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )
        }
      </Flex>
    </HStack>
  );
};
export default UserProfile;
