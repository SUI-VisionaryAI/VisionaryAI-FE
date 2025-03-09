import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaDatabase } from 'react-icons/fa';

const UploadDataset = () => {
  const [dataset, setDataset] = useState({
    owner: 'hiro26',
    datasetName: '',
    license: '',
    visibility: 'public',
  });

  const toast = useToast();

  const handleCreateDataset = () => {
    if (!dataset.datasetName || !dataset.license) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields before creating the dataset.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Dataset Created',
      description: `Dataset "${dataset.datasetName}" has been successfully created!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      mapt={{ base: '180px', md: '80px', xl: '80px' }}
      pt={{ base: '180px', md: '80px', xl: '80px' }}
      maxW="600px"
      mx="auto"
    >
      {/* Page Title */}
      <VStack spacing={3} textAlign="center">
        <FaDatabase size={40} />
        <Text fontSize="2xl" fontWeight="bold">
          Create a new dataset repository
        </Text>
        <Text fontSize="sm">
          A repository contains all dataset files, including the revision
          history.
        </Text>
      </VStack>

      {/* Form Fields */}
      <VStack spacing={5} mt={6} align="stretch">
        {/* Owner */}
        <FormControl>
          <FormLabel>Owner</FormLabel>
          <Select
            value={dataset.owner}
            onChange={(e) => setDataset({ ...dataset, owner: e.target.value })}
          >
            <option value="hiro26">hiro26</option>
            <option value="other">Other User</option>
          </Select>
        </FormControl>

        {/* Dataset Name */}
        <FormControl>
          <FormLabel>Dataset Name</FormLabel>
          <Input
            placeholder="New dataset name"
            value={dataset.datasetName}
            onChange={(e) =>
              setDataset({ ...dataset, datasetName: e.target.value })
            }
          />
        </FormControl>

        {/* License */}
        <FormControl>
          <FormLabel>License</FormLabel>
          <Input
            placeholder="License"
            value={dataset.license}
            onChange={(e) =>
              setDataset({ ...dataset, license: e.target.value })
            }
          />
        </FormControl>

        {/* Visibility Selection */}
        <FormControl>
          <RadioGroup
            value={dataset.visibility}
            onChange={(value) => setDataset({ ...dataset, visibility: value })}
          >
            <Stack direction="column" spacing={2}>
              <Radio value="public">
                <Text>Public</Text>
                <Text fontSize="sm">
                  Anyone on the internet can see this dataset. Only you
                  (personal dataset) or members of your organization
                  (organization dataset) can commit.
                </Text>
              </Radio>
              <Radio value="private">
                <Text>Private</Text>
                <Text fontSize="sm">
                  Only you (personal dataset) or members of your organization
                  (organization dataset) can see and commit to this dataset.
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* Information Box */}
        <Box p={3} borderRadius="md" textAlign="center">
          <Text fontSize="sm">
            Once your dataset is created, you can upload your files using the
            web interface or Git.
          </Text>
        </Box>

        {/* Submit Button */}
        <Button onClick={handleCreateDataset} w="full">
          Create Dataset
        </Button>
      </VStack>
    </Box>
  );
};

export default UploadDataset;
