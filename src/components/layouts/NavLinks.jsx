// import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { NavLink as Link, useLocation } from "react-router-dom";
import React from "react";
export default function NavLinks({ link, ...rest }) {
  const { name, icon, to } = link;
  const location = useLocation();
  return (
    <Link to={to}>

        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color="white"
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Text color="white" fontSize="1.2rem">
            {name}
          </Text>
        </Flex>
    </Link>
  );
}
