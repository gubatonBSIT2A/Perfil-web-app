import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Actions({ children }) {
  return (
    <Popover placement="auto">
      <PopoverTrigger>
        <IconButton
          color={'black'}
          icon={<BsThreeDotsVertical />}
          variant="link"
          w="fit-content"
        />
      </PopoverTrigger>
      <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
        <PopoverArrow />
        <PopoverBody>
          <Stack>{children}</Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
