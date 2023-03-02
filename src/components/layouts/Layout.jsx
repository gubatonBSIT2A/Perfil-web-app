import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
export function Layout({ children }) {
  const { logout, currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {currentUser && (
        <Box minH="100vh" bg={'gray.100'}>

          <Sidebar
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <Sidebar onClose={onClose} />
            </DrawerContent>
          </Drawer>

          {/*= Header =*/}
          <Header onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="5">
            {children}
          </Box>
        </Box>
      )}
      {!currentUser && (
        <Box>
          <Navbar />
          <Container>{children}</Container>
        </Box>
      )}
    </>
  );
}
