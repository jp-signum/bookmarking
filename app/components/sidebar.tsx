// siebar abstraction for listing transcripts
import { VStack, Link, Text, Box } from "@chakra-ui/react";
import { Transcript } from "@/app/types/types";

interface SidebarProps {
  transcripts: { transcript: Transcript }[] | null;
}

const Sidebar: React.FC<SidebarProps> = ({ transcripts }) => {
  return (
    <Box
      maxWidth="250px"
      width="full"
      bg="gray.100"
      p={4}
      height="100vh"
      position="sticky"
      top={0}
    >
      <VStack align="stretch" width="full" spacing={4} mb={6}>
        <Link
          href="/bookmarks"
          p={2}
          borderRadius="md"
          fontWeight="bold"
          _hover={{ bg: "teal.100" }}
        >
          View All Bookmarks
        </Link>
      </VStack>
      <VStack align="stretch" width="full" spacing={2}>
        {transcripts?.map(({ transcript }) => (
          <Link
            p={2}
            key={transcript.id}
            href={`#${transcript.id}`}
            borderRadius="md"
            _hover={{ bg: "teal.100" }}
          >
            <Text fontSize="sm">{transcript.interview_name}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
