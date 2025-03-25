import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Icon,
  Link,
  useColorModeValue,
  Image,
  Tooltip,
  Grid,
} from '@chakra-ui/react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { FaDownload } from 'react-icons/fa';
import data from '../../../data.json';
import { AiOutlineCaretRight } from 'react-icons/ai';

export default function ModelDetail() {
  const [model] = useState(data[0]);
  const [like, setLike] = useState(false);

  const textColor = useColorModeValue('gray.800', 'white');
  const labelColor = useColorModeValue('gray.500', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');

  const displayImage =
    model?.image ||
    `https://placehold.co/600x400?text=${model?.name || 'Model'}`;

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Flex direction="column" flex="1">
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>
              {model?.owner}/{model?.name}
            </Text>

            <Text fontSize="sm" color={labelColor} mb={2}>
              Version: {model?.version}
            </Text>

            <Flex gap={2} flexWrap="wrap" mb={4}>
              {model?.tags?.map((tag, i) => (
                <Badge
                  key={i}
                  colorScheme="purple"
                  borderRadius="lg"
                  px={2}
                  py={1}
                  cursor="default"
                >
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Text fontSize="md" mb={4} color={textColor}>
              {model?.description}
            </Text>

            <Flex
              gap={6}
              flexWrap="wrap"
              fontSize="sm"
              color={labelColor}
              mb={4}
            >
              <Text>
                <strong>Framework:</strong> {model?.framework}
              </Text>
              <Text>
                <strong>Task:</strong> {model?.task}
              </Text>
              <Text>
                <strong>Language:</strong> {model?.language || 'N/A'}
              </Text>
              <Text>
                <strong>License:</strong> {model?.license}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Box flexShrink={0}>
            <Image
              src={displayImage}
              alt={model?.name}
              borderRadius="lg"
              maxW="320px"
              h="auto"
            />
          </Box>
          <Flex gap="4px" align="center" mt="8px">
            <Button colorScheme="blue" variant="solid">
              <AiOutlineCaretRight />
            </Button>
            <Tooltip label="Like this model">
              <Button
                leftIcon={<Icon as={like ? IoHeart : IoHeartOutline} />}
                onClick={() => setLike(!like)}
                colorScheme="pink"
              >
                {like ? (model?.likes || 0) + 1 : model?.likes || 0}
              </Button>
            </Tooltip>

            <Tooltip label="Downloads">
              <Button colorScheme="green" leftIcon={<FaDownload />}>
                {model?.downloads || 0}
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
}
