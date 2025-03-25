import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import { useNavigate } from 'react-router-dom';

const nftImages = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6];

const getRandomImage = () => {
  return nftImages[Math.floor(Math.random() * nftImages.length)];
};

export default function ModelCard(props) {
  const {
    id,
    name,
    owner,
    description,
    framework,
    task,
    language,
    version,
    likes,
    downloads,
    inference,
    tags,
    imageurl,
  } = props;
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue('navy.700', 'white');
  const textSecondary = useColorModeValue('secondaryGray.600', 'gray.400');
  const displayImage = imageurl || getRandomImage();
  return (
    <Card p="20px">
      <Flex direction="column" justify="center" h="100%">
        <Box mb="20px" position="relative">
          <Image
            src={displayImage}
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="20px"
          />
          <Button
            position="absolute"
            bg="white"
            _hover={{ bg: 'whiteAlpha.900' }}
            _active={{ bg: 'white' }}
            _focus={{ bg: 'white' }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => setLike(!like)}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={like ? IoHeart : IoHeartOutline}
              color="brand.500"
            />
          </Button>
        </Box>

        <Flex direction="column" justify="space-between" flex="1">
          <Text
            cursor="pointer"
            onClick={() => {
              navigate(`/admin/model/${id}`);
            }}
            color={textColor}
            fontSize="lg"
            fontWeight="bold"
            mb="5px"
          >
            {name}
          </Text>
          <Text color={textSecondary} fontSize="sm" mb="10px">
            by {owner}
          </Text>
          <Text color={textSecondary} fontSize="sm" noOfLines={2} mb="10px">
            {description}
          </Text>

          <Flex wrap="wrap" gap="6px" mb="10px">
            {tags?.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                colorScheme="purple"
                borderRadius="12px"
                cursor="default"
              >
                {tag}
              </Badge>
            ))}
          </Flex>

          <Flex justify="space-between" fontSize="sm" color={textSecondary}>
            <Text>Likes: {likes}</Text>
            <Text>Downloads: {downloads}</Text>
          </Flex>

          <Flex
            justify="space-between"
            fontSize="sm"
            color={textSecondary}
            mt="5px"
          >
            <Text>Framework: {framework}</Text>
            <Text>Task: {task}</Text>
          </Flex>

          <Link href={inference?.endpoint} isExternal mt="16px">
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              w="100%"
            >
              Try Model
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}
