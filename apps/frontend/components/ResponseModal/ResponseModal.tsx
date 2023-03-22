import { CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Box,
  Flex,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ResponseModalState } from './atom';

const ResponseModal = ({ content }) => {
  const btnRef = React.useRef(null);
  const [respOpen, setRespOpen] = useRecoilState(ResponseModalState);
  const toast = useToast();
  const id = 'copy-toast';

  console.log(respOpen);
  return (
    <>
      <Modal
        onClose={() =>
          setRespOpen((prev) => {
            return { content: '', open: false };
          })
        }
        finalFocusRef={btnRef}
        isOpen={respOpen.open}
        scrollBehavior="inside"
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generated Cover Letter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              style={{
                whiteSpace: 'pre-line',
              }}
            >
              {respOpen.content || (
                <Center h="400px">
                  <Spinner size="xl" color="blue.500" thickness="3px" />
                </Center>
              )}
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={'space-between'}>
            <Button
              isDisabled={!respOpen.content}
              bg="white"
              onClick={() => {
                if (respOpen?.content) {
                  navigator.clipboard.writeText(respOpen?.content).then(() => {
                    if (!toast.isActive(id)) {
                      toast({
                        id,
                        description: 'Copied to clipboard',
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                        variant: 'subtle',
                      });
                    }
                  });
                }
              }}
            >
              <Flex gap={3} align="center">
                <CopyIcon />
                Copy
              </Flex>
            </Button>
            <Button
              onClick={() =>
                setRespOpen((prev) => {
                  return { content: '', open: false };
                })
              }
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResponseModal;
