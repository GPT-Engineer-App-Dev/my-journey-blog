import { Box, Container, Flex, Heading, Text, VStack, HStack, Spacer, Link, Button, useColorModeValue, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { FaHome, FaUser, FaEnvelope, FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedPosts = posts.filter((post) => post !== selectedPost);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    onClose();
  };

  return (
    <Container maxW="container.xl" p={0} bg={bg} color={color}>
      <Flex as="nav" bg={useColorModeValue("gray.800", "gray.900")} color="white" p={4} align="center">
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
              <Box key={index} p={5} shadow="md" borderWidth="1px" position="relative">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.content}</Text>
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  onClick={() => handleDeleteClick(post)}
                />
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" p={4} bg={useColorModeValue("gray.200", "gray.600")} mt={{ base: 4, md: 0 }}>
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;