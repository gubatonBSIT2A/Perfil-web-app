import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";

import {
  FiHome,
  FiActivity,
  FiUsers,
  FiUser,
  FiTrello,
  FiAlertCircle,
} from "react-icons/fi";

import NavLinks from "./NavLinks";

const LinkItems = [
  { name: "Home", icon: FiHome, to: "/home" },
  { name: "Establishments", icon: FiTrello, to: "/establishments" },
  { name: "Patients", icon: FiUsers, to: "/patients" },
  { name: "Health workers", icon: FiUser, to: "/social-worker" },
  { name: "Reports", icon: FiActivity, to: "/reports" },
  // { name: "Reference Only", icon: FiAlertCircle, to: "/target-client-list" },
];

export default function Sidebar({ onClose, ...rest }) {
  return (
    <Box
      transition="3s ease"
      bg="blue.900"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="white">
          PERFIL
        </Text>
        <CloseButton
          colorScheme="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link, i) => (
        <NavLinks  key={i} link={link} />
      ))}
    </Box>
  );
}
