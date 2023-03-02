import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Layout } from '../components/layouts/Layout'
import { useAuth } from "../contexts/AuthContext";

export default function Registerpage() {
  const history = useHistory();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [displayName, setName] = useState("");

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Layout>
      <Heading textAlign="center" my={5}>
        Register
      </Heading>
      <Card maxW="md" mx="auto">
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email || !password) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            // your register logic here
            setIsSubmitting(true);
            register(email, password, displayName)
              .then((res) => {})
              .catch((error) => {
                console.log(error.message);

                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false);
              });
          }}
        >
          <Stack spacing="6">
            <FormControl id="name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="name"
                type="name"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="name"
                type="name"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
