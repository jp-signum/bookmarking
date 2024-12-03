// main transcript content list (quotes)
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Transcript, TranscriptQA } from "@/utils/types";

interface TranscriptListProps {
  transcript: Transcript;
  quotes: TranscriptQA[];
}

const TranscriptList: React.FC<TranscriptListProps> = ({
  transcript,
  quotes,
}) => {
  return (
    <Box
      id={transcript.id}
      key={transcript.id}
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading size="md" mb={4} color="teal.600">
        Interview
      </Heading>
      <Text fontSize="lg" mb={6} color="gray.700">
        {transcript.interview_name}
      </Text>

      <Heading size="md" mb={4} color="teal.600">
        Quotes
      </Heading>

      <VStack align="stretch" spacing={6}>
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
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TranscriptList;
