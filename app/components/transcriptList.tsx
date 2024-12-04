// main transcript content list (quotes)
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Transcript, TranscriptQA } from "@/app/types/types";

interface TranscriptListProps {
  transcript: Transcript;
  quotes: TranscriptQA[];
}

const TranscriptList: React.FC<TranscriptListProps> = ({
  transcript,
  quotes,
}) => {
  const [folderId, setFolderId] = useState<number | null>(null); // selected folder ID
  const [folders, setFolders] = useState<{ id: number; name: string }[]>([]); // list of folders
  const [newFolderName, setNewFolderName] = useState("");  //
  const [isModalOpen, setIsModalOpen] = useState(false); // modal controller
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null); //selected quote ID

  // fetch bookmarked folders when the component mounts
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get("/api/bookmarkFolders");
        console.log("Fetched folders:", response.data);
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching bookmark folders:", error);
      }
    };

    fetchFolders();
  }, []);

  // create a bookmark folder
  const createFolder = async (folderName: string) => {
    try {
      const response = await axios.post("/api/bookmarkFolders", {
        name: folderName,
      });
      const newFolder = response.data;

      // Avoid adding duplicates to the folders list
      setFolders((prevFolders) => {
        const isDuplicate = prevFolders.some(
          (folder) => folder.id === newFolder.id
        );
        return isDuplicate ? prevFolders : [...prevFolders, newFolder];
      });

      setNewFolderName(""); 
      return newFolder.id;
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder");
      return null;
    }
  };

  // save a quote to the selected folder
  const saveBookmark = async (quoteId: number) => {
    try {
      let currentFolderId = folderId;

      if (!currentFolderId) {
        if (!newFolderName.trim()) {
          alert("Please enter a folder name.");
          return;
        }

        currentFolderId = await createFolder(newFolderName);
        if (!currentFolderId) return;
      }

      await axios.post(`/api/transcript/${transcript.id}/bookmarks`, {
        quoteId,
        folderId: currentFolderId,
      });
      alert("Bookmark saved successfully!");
    } catch (error) {
      console.error("Failed to save bookmark:", error);
      alert("Failed to save bookmark.");
    }
  };

  return (
    <Box id={transcript.id}>
      <VStack align="stretch" spacing={6}>
        <Heading size="md" mb={4} color="teal.600">
          {transcript.interview_name}
        </Heading>

        <Heading size="md" mb={4} color="teal.600">
          Quotes
        </Heading>

        {quotes.map((quote) => (
          <Box
            key={quote.id}
            borderWidth={1}
            borderRadius="md"
            p={6}
            bg="gray.100"
            boxShadow="sm"
          >
            <Text fontWeight="bold" fontSize="lg" color="teal.700">
              {quote.question}
            </Text>
            <Text fontSize="md" color="gray.800">
              {quote.answer}
            </Text>
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedQuoteId(quote.id);
              }}
            >
              Save to Bookmark
            </Button>
          </Box>
        ))}
      </VStack>

      {/* ----------------------------   Modal  -------------------------------------------------- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select or Create a Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select a folder"
              onChange={(e) => setFolderId(parseInt(e.target.value, 10))}
              mb={4}
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </Select>

            <Box>
              <Text mb={2} fontSize="sm" color="gray.600">
                Or create a new folder:
              </Text>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #CBD5E0",
                }}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={async () => {
                if (!folderId) {
                  if (!newFolderName.trim()) {
                    alert("Please enter a folder name.");
                    return;
                  }
                  const newFolderId = await createFolder(newFolderName);
                  if (!newFolderId) return;
                  setFolderId(newFolderId);
                }

                if (selectedQuoteId) {
                  saveBookmark(selectedQuoteId);
                }

                setIsModalOpen(false);
              }}
            >
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TranscriptList;
