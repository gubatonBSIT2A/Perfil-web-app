import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  IconButton,
  ModalCloseButton,
  ModalBody,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
export default function PateintExamResultDetails({ exam }) {
  const [details, setDetails] = useState(exam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip placement="auto" hasArrow label={"Click to view details"}>
        <IconButton
          colorScheme={"teal"}
          icon={<InfoIcon />}
          onClick={() => {
            onOpen();
          }}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Examined patient details</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={7}>
            <VStack align={"left"} spacing={5}>
              <Box>
                <Text color={"gray.400"}>Patient Name</Text>
                <Text fontWeight={"bold"}>
                  {details.patientFirstName} {details.patientMiddleName}{" "}
                  {details.patientLastName}
                </Text>
              </Box>
              <Box>
                <Text color={"gray.400"}>Examination</Text>
                <Text fontWeight={"bold"}>{details.examinationName}</Text>
              </Box>
              <Box>
                <Text color={"gray.400"}>Examined By</Text>
                <Text fontWeight={"bold"}>{details.examinedBy}</Text>
              </Box>
              <Box>
                <Text color={"gray.400"}>Date Examined</Text>
                <Text fontWeight={"bold"}>
                    {new Date(details.dateExamined * 1000).toDateString()}
                </Text>
              </Box>
              <Box>
                <Text color={"gray.400"}>Date of next appointment</Text>
                <Text fontWeight={"bold"}>
                    {new Date(details.dona * 1000).toDateString()}
                </Text>
              </Box>
              <Box>
                <Text color={"gray.400"}>Examination Result</Text>
                <Text fontWeight={"bold"}>{details.result}</Text>
              </Box>
              {/* if details.result is Positive show Diagnosis else hide */}
              {details.result === "Positive" ? (
                <Box>
                  <Text color={"gray.400"}>Diagnosis</Text>
                  {/* separate details.diagnosis value and arrange in ascending order */}
                  <Text fontWeight={"bold"}>
                    {details.diagnosis.sort().map((diagnosis) => (
                      <li>{diagnosis}</li>
                    ))}
                  </Text>
                </Box>
              ) : null}
                            {details.diagnosis.includes("Gonorrhea") ||
              details.diagnosis.includes("Syphilis") ||
              details.diagnosis.includes("Trichomonas") ||
              details.diagnosis.includes("Bacterial Vaginosis") ||
              details.diagnosis.includes("Nan-Gono Inf") ||
              details.diagnosis.includes("Genital Herpes") ||
              details.diagnosis.includes("Genital Warts") ? (
                <Box>
                  <Text color={"gray.400"}>Medical Receipt</Text>
                  <Text fontWeight={"bold"}>{details.receipt}</Text>
                </Box>
              ) : null}
              {/* if details.diagnosis has "Other specify to" show remarks else hide */}
              {details.diagnosis.includes("Other specify to") ? (
                <Box>
                  <Text color={"gray.400"}>Remarks</Text>
                  <Text fontWeight={"bold"}>{details.remarks}</Text>
                </Box>
              ) : null}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
