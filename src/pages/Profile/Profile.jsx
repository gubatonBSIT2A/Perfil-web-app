import { Box, Center, HStack, Text, Avatar, Wrap, WrapItem, Stack, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout'
import { useAuth } from '../../contexts/AuthContext'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../utils/init-firebase'

import Update from './Update'

export default function Profile() {
  const { currentUser } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const userData = []
    const q = query(collection(db, "users"), where("email", "==", currentUser.email))
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      setData(userData)
    })

  };

  return (
    <Layout>
      <Center>
        <Box
          borderWidth='1px'
          p={10}
          borderRadius='lg'
        >
          <HStack justify={'right'}>
            {data.map(item => (
              <Flex align={'center'}>
                <Update id={item}/>
              </Flex>
            ))}
          </HStack>
          <Stack spacing={5}>
            <Center>
              <Wrap>
                <WrapItem>
                  <Avatar size='2xl' src='https://bit.ly/broken-link' />
                </WrapItem>
              </Wrap>
            </Center>
            {data.map(user => (
              <>
              <Center>
                <Text>
                  {user.displayName}
                </Text>
              </Center>
              </>
            ))}
            <HStack spacing={10}>
              <Box>
                <Center>
                  <Text color='gray.500' fontWeight={700}>
                    Email
                  </Text>
                </Center>
                {currentUser.email}
              </Box>
              <Box>
                <Center>
                  <Text color='gray.500' fontWeight={700}>
                    Last Login
                  </Text>
                </Center>
                {currentUser.metadata.lastSignInTime}
              </Box>
              <Box>
                <Center>
                  <Text color='gray.500' fontWeight={700}>
                    Date Account Created
                  </Text>
                </Center>
                {currentUser.metadata.creationTime}
              </Box>
            </HStack>
          </Stack>
        </Box>


      </Center>
      {/* <Heading>User Profile</Heading>
      <Container maxW='container.lg' overflowX='auto' py={4}>
        <Center py={12}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'md'}
        overflow={'hidden'}
        boxShadow={'lg'}
        >
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {data.map(item => (
                <Flex align={'center'}>
                  <Text fontSize={'md'} fontWeight={500}>
                    {item.displayName}
                  </Text>
                </Flex>
              ))}
            </Heading>
          </Stack>
            <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Email</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
              {currentUser.email}
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Last Login</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                  {currentUser.metadata.lastSignInTime}
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Date Account Created</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
              {currentUser.metadata.creationTime}
              </Text>
            </Stack>
          </Stack>


          <Stack direction={'row'} justify={'center'} spacing={6}>

              {data.map(item => (
                  <Flex align={'center'}>

                      <Update id={item}> </Update>
                  </Flex>
              ))}


          </Stack>
        </Box>
      </Box>
    </Center>
      </Container> */}
    </Layout>
  )
}
