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
      <HStack mb={6}>
        <Link href="/">
          <Button colorScheme="teal">Go to Home</Button>
        </Link>
      </HStack>
      <Heading size="lg" mb={6} color="teal.600">
        All Bookmarks
      </Heading>
      <Accordion allowMultiple>
        {folders.map((folder) => (
          <AccordionItem key={folder.id}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="md" color="teal.500">
                  {folder.name}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
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
