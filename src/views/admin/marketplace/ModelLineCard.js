import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  Image,
  Tooltip,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { IoHeartOutline } from 'react-icons/io5';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';

const nftImages = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6];
const getRandomImage = () =>
  nftImages[Math.floor(Math.random() * nftImages.length)];

export default function ModelLineCard(props) {
  const {
    id,
    name,
    owner,
    description,
    tags,
    likes,
    downloads,
    task,
    imageurl,
    updatedAt,
  } = props;

  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.800', 'white');
  const subText = useColorModeValue('gray.500', 'gray.300');
  const bgCard = useColorModeValue('white', 'gray.800');
  const displayImage = imageurl || getRandomImage();

  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      borderRadius="md"
      bg={bgCard}
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
      mb={3}
      gap={4}
      cursor="pointer"
      onClick={() => navigate(`/admin/model/${id}`)}
      transition="all 0.1s"
    >
      <Image
        src={displayImage}
        alt={name}
        boxSize="40px"
        borderRadius="md"
        objectFit="cover"
      />

      <Flex direction="column" flex="1" minW={0}>
        <Text fontWeight="bold" fontSize="sm" color={textColor} isTruncated>
          {owner}/{name}
        </Text>
        <Text fontSize="xs" color={subText} mt={1} isTruncated>
          {task || 'AI Model'} • Updated{' '}
          {updatedAt
            ? new Date(updatedAt).toLocaleDateString()
            : 'some time ago'}
        </Text>
        <Flex gap="4px">
          {tags?.map((tag) => (
            <Badge
              colorScheme="blue"
              fontSize="0.7rem"
              px={2}
              py="2px"
              borderRadius="md"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      </Flex>

      <Flex align="center" gap={4}>
        <Flex align="center" fontSize="xs" color={subText}>
          <Icon as={FaDownload} boxSize="3" mr="1" />
          {downloads?.toLocaleString() || '0'}
        </Flex>
        <Flex align="center" fontSize="xs" color={subText}>
          <Icon as={IoHeartOutline} boxSize="3" mr="1" />
          {likes?.toLocaleString() || '0'}
        </Flex>
      </Flex>
    </Flex>
  );
}
