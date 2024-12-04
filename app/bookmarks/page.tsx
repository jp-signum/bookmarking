// display composite for bookmark folders
"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Button
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Folder } from "@/utils/types";

const BookmarksPage = () => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get<Folder[]>("/api/bookmarkFolders/all");
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <Box p={6}>
      <HStack mb={6} spacing={4}>
        <Link href="/">
          <Button colorScheme="teal" size="md" boxShadow="sm">
            Go to Home
          </Button>
        </Link>
      </HStack>
      <Button
        colorScheme="teal"
        size="md"
        boxShadow="sm"
        onClick={() => {
          window.open("/api/bookmarkFolders/export", "_blank");
        }}
      >
        Export to CSV
      </Button>
      <Heading size="lg" mb={6} color="teal.700" textAlign="center">
        All Bookmarks
      </Heading>
      <Accordion allowMultiple>
        {folders.map((folder) => (
          <AccordionItem key={folder.id} border="none">
            <AccordionButton
              _expanded={{ bg: "teal.50", color: "teal.700" }}
              _hover={{ bg: "teal.100" }}
              px={4}
              py={2}
              borderRadius="md"
              mb={2}
              boxShadow="sm"
            >
              <Box flex="1" textAlign="left">
                <Heading size="sm" color="teal.600">
                  {folder.name}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} bg="gray.50" borderRadius="md">
              <VStack align="stretch" spacing={4}>
                {folder.bookmarks.map((bookmark) => (
                  <Box
                    key={bookmark.id}
                    borderWidth={1}
                    borderRadius="md"
                    p={4}
                    bg="gray.100"
                    boxShadow="sm"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="teal.700">
                      {bookmark.transcript?.interview_name ||
                        "Unknown Transcript"}
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <Text fontSize="md" fontWeight="bold" color="teal.700">
                        Question: {bookmark.quote?.question || "N/A"}
                      </Text>
                      <Text fontSize="md" color="gray.800">
                        Answer: {bookmark.quote?.answer || "N/A"}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default BookmarksPage;
