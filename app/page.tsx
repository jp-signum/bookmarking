// landing page composite
'use client';

import { useState, useEffect } from "react";
import { HStack, VStack, Box } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import TranscriptContent from "./components/transcriptList";
import { fetchTranscript } from "@/utils/api";
import { TranscriptWithQA } from "@/app/types/types";

const Home = () => {
  const [transcripts, setTranscripts] = useState<TranscriptWithQA[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTranscript()
      .then((data) => {
        setTranscripts(data.transcripts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <HStack align="flex-start" height="full" width="full" spacing={0}>
      <Sidebar transcripts={transcripts} />
      <VStack
        p={8}
        spacing={8}
        align="stretch"
        bg="gray.50"
        borderRadius="md"
        boxShadow="lg"
        w="full"
      >
        {loading && <Box>Loading...</Box>}
        {transcripts?.map(({ transcript, quotes }) => (
          <TranscriptContent
            key={transcript.id}
            transcript={transcript}
            quotes={quotes}
          />
        ))}
      </VStack>
    </HStack>
  );
};

export default Home;