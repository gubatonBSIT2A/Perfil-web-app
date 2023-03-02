// import Image from "next/image";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  chakra,
  Image,
  HStack,
  Button,
  IconButton,
  Divider,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiTwotoneStar } from "react-icons/ai";

const ChakraStar = chakra(AiTwotoneStar);

export default function ProductCard({ product, setModalData }) {
  const { img, title, color } = product;
  const score = Math.floor(Math.random(5) * 5);
  const reviewCount = Math.floor(Math.random(50) * 50);

  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      bg="white"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      onClick={() => setModalData(product)}
    >
      <Box w="full" h="full">
        <Box
          w="100%"
          height="200px"
          position="relative"
          overflow="hidden"
          roundedTop="lg"
        >
          <Box h={"100%"} flex="1" bg={color}></Box>
        </Box>

        <Box p="6">
          <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>

          <Flex py={3}>
            <Button colorScheme="teal" variant="solid" minW={"150px"}>
              Details
            </Button>
            <Spacer />
            <IconButton
              variant={"outline"}
              colorScheme={"red"}
              icon={<DeleteIcon />}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
