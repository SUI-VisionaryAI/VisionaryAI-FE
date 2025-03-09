import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

// Step UI Component
const Stepper = ({ currentStep, setStep }) => {
  const steps = ['Create model', 'Add version', 'Upload Images'];

  return (
    <HStack spacing={6} mb={6} justify="center">
      {steps.map((label, index) => (
        <Button
          key={index}
          variant="ghost"
          fontWeight="bold"
          color={currentStep === index + 1 ? 'teal.400' : 'gray.500'}
          onClick={() => setStep(index + 1)}
          _hover={{ color: 'teal.300' }}
        >
          {index + 1}. {label}
        </Button>
      ))}
    </HStack>
  );
};

// Step Components
const ModelDetailsStep = ({ formData, setFormData, nextStep }) => {
  return (
    <VStack spacing={6} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">
        Step 1: Create Model
      </Text>

      {/* Model Name */}
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter the model name"
          value={formData.modelName}
          onChange={(e) =>
            setFormData({ ...formData, modelName: e.target.value })
          }
        />
      </FormControl>

      {/* Model Type */}
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select
          placeholder="Please select the model type"
          value={formData.modelType}
          onChange={(e) =>
            setFormData({ ...formData, modelType: e.target.value })
          }
        >
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
        </Select>
      </FormControl>

      {/* Content Tags */}
      <FormControl>
        <FormLabel>Content Tags</FormLabel>
        <Stack direction="row">
          <Select
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </Select>

          <Select
            placeholder="Function"
            value={formData.functionType}
            onChange={(e) =>
              setFormData({ ...formData, functionType: e.target.value })
            }
          >
            <option value="function1">Function 1</option>
            <option value="function2">Function 2</option>
          </Select>
        </Stack>
      </FormControl>

      {/* Tags */}
      <FormControl>
        <FormLabel>Tags</FormLabel>
        <Input
          placeholder="Enter tags and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value) {
              setFormData({
                ...formData,
                tags: [...formData.tags, e.target.value],
              });
              e.target.value = '';
            }
          }}
        />
        <Stack direction="row" mt={2}>
          {formData.tags.map((tag, index) => (
            <Box
              key={index}
              p={2}
              bg="gray.200"
              borderRadius="md"
              fontSize="sm"
            >
              {tag}
            </Box>
          ))}
        </Stack>
      </FormControl>
      {/* Commercial Use Permissions */}
      <FormControl>
        <FormLabel>Commercial Use</FormLabel>
        <Stack spacing={2}>
          <Checkbox
            isChecked={false}
            // onChange={(e) =>
            //   setPermissions({
            //     ...permissions,
            //     commercialUse: e.target.checked,
            //   })
            // }
          >
            Generated images can be used for commercial purposes
          </Checkbox>
          <Checkbox
            isChecked={true}
            // onChange={(e) =>
            //   setPermissions({
            //     ...permissions,
            //     resaleAllowed: e.target.checked,
            //   })
            // }
          >
            Allow model resale or sale after merging
          </Checkbox>
        </Stack>
      </FormControl>

      <Button colorScheme="teal" onClick={nextStep}>
        Next
      </Button>
    </VStack>
  );
};

const VersionStep = ({ prevStep, nextStep }) => (
  <VStack spacing={6} align="stretch">
    <Text fontSize="2xl" fontWeight="bold">
      Step 2: Add Version
    </Text>
    <FormControl>
      <FormLabel>Version</FormLabel>
      <Input placeholder="Enter version details" />
    </FormControl>
    <Stack direction="row" justifyContent="space-between">
      <Button onClick={prevStep}>Back</Button>
      <Button colorScheme="teal" onClick={nextStep}>
        Next
      </Button>
    </Stack>
  </VStack>
);

const UploadImagesStep = ({ prevStep }) => (
  <VStack spacing={6} align="stretch">
    <Text fontSize="2xl" fontWeight="bold">
      Step 3: Upload Images
    </Text>
    <FormControl>
      <FormLabel>Upload</FormLabel>
      <Input type="file" />
    </FormControl>
    <Button onClick={prevStep}>Back</Button>
  </VStack>
);

// Main Upload Model Component
const UploadModel = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    modelName: '',
    modelType: '',
    category: '',
    functionType: '',
    tags: [],
  });

  return (
    <Box
      pt={{ base: '180px', md: '80px', xl: '80px' }}
      p={6}
      maxW="600px"
      mx="auto"
    >
      <Stepper currentStep={step} setStep={setStep} />
      {step === 1 && (
        <ModelDetailsStep
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <VersionStep prevStep={() => setStep(1)} nextStep={() => setStep(3)} />
      )}
      {step === 3 && <UploadImagesStep prevStep={() => setStep(2)} />}
    </Box>
  );
};

export default UploadModel;
