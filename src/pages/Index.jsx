import { Box, Container, Flex, Heading, Text, VStack, HStack, Spacer, Link, Button } from "@chakra-ui/react";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="gray.800" color="white" p={4} align="center">
        <HStack spacing={4}>
          <Link href="/" fontSize="xl" fontWeight="bold">
            MyBlog
          </Link>
          <Link href="/" display="flex" alignItems="center">
            <FaHome />
            <Text ml={2}>Home</Text>
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaUser />
            <Text ml={2}>About</Text>
          </Link>
          <Link href="#" display="flex" alignItems="center">
            <FaEnvelope />
            <Text ml={2}>Contact</Text>
          </Link>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Link href="#">Login</Link>
          <Link href="#">Sign Up</Link>
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} mt={4}>
        <Box flex="3" p={4}>
          <Button colorScheme="teal" mb={4} as={Link} href="/add-post">
            Add New Post
          </Button>
          <VStack spacing={8} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.content}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" p={4} bg="gray.100" mt={{ base: 4, md: 0 }}>
          <Heading fontSize="lg" mb={4}>Sidebar</Heading>
          <VStack spacing={4} align="stretch">
            <Box p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="md">About Me</Heading>
              <Text mt={2}>Short bio...</Text>
            </Box>
            <Box p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="md">Categories</Heading>
              <Text mt={2}>Category list...</Text>
            </Box>
            <Box p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="md">Recent Posts</Heading>
              <Text mt={2}>Recent post titles...</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;