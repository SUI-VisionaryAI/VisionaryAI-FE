import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";
import { useCreateNewModelMutation, useMintModelMutation } from "wallet/blockchain";
import { useCurrentAccount, useSuiClientInfiniteQuery } from "@mysten/dapp-kit";

export default function Banner() {
  const { mutate: createNewModelMutation, isPending: pendingCancellation, da } = useCreateNewModelMutation()
  const { mutate: mintModelMutation } = useMintModelMutation()
  const currentAccount = useCurrentAccount();
  const clickCreateBtn = async () => {
    console.log(currentAccount, 'currentAccountcurrentAccount');
    const res = await createNewModelMutation({object:{totalSupply: '123', metadataUrl: "fddfdfd",burnable: false, price: '123', recipientAddress: currentAccount?.address}},{
      onSuccess: (result) => {
        console.log("Transaction result:", result);
      },
    },)
    // const res = await mintModelMutation({object: {modelMetadataId: "0x35b2b05fe6d954f1f1e4254c51e4b00e6b20625d7d5d927ffe4bf95f53172e16", paymentAmount: 123}})
    console.log(res, 'resresres');
    
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuiClientInfiniteQuery(
      "getOwnedObjects",
      {
      
        owner: currentAccount?.address,
        options: {
          showContent: true,
          showOwner: true,
        },
      },
     
    );
    console.log(data, 'datadataobject');
    
  // Chakra Color Mode
  return (
    <Flex
      direction='column'
      bgImage={banner}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
        Discover, collect, and sell extraordinary NFTs
      </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight='500'
        mb='40px'
        lineHeight='28px'>
        Enter in this creative world. Discover now the latest NFTs or start
        creating your own!
      </Text>
      <Flex align='center'>
        <Button
          bg='white'
          color='black'
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          fontWeight='500'
          fontSize='14px'
          py='20px'
          onClick={clickCreateBtn}
          px='27'
          me='38px'>
          Discover now
        </Button>
        <Link>
          <Text color='white' fontSize='sm' fontWeight='500'>
            Watch video
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
