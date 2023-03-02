import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Stack,
  } from "@chakra-ui/react";
  import React from 'react';
  import { CloseIcon, AddIcon } from "@chakra-ui/icons";
  import CreateAnnouncement from    '../../pages/Announcements/CreateAnnouncement';
  import CreateAppointment from    '../../pages/Appointments/CreateAppointment';
  
  export default function EstablishmentDetailsActions({data}) {
    const initRef = React.useRef()
    return (
      <Popover closeOnBlur={true} placement='left' initialFocusRef={initRef}>
         {({ isOpen, onClose }) => (
        <>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={ isOpen ? <CloseIcon/> : <AddIcon/>}
            variant="solid"
            w="fit-content"
            colorScheme={'green'}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <CreateAnnouncement data={data}/>
              <CreateAppointment data={data}/>
            </Stack>
          </PopoverBody>
        </PopoverContent>
        </>
      )}
      </Popover>
    );
  }
  