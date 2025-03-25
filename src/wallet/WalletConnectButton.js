import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from '@mysten/dapp-kit';
import { addressShortener } from 'utils';
import { useEffect } from 'react';

export const CustomConnectButton = () => {
  const toast = useToast();
  const { mutate: connect, isError, error } = useConnectWallet();
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();

  const handleConnect = (wallet) => {
    try {
      connect({ wallet });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast({
        title: 'Connection Error',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, error, toast]);

  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');

  if (currentAccount)
    return (
      <>
        <Menu>
          <MenuButton px="20px" fontWeight="500">
            {addressShortener(currentAccount.address)}
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
          >
            <Flex w="100%" mb="0px">
              <Text
                ps="20px"
                pt="16px"
                pb="10px"
                w="100%"
                borderBottom="1px solid"
                borderColor={borderColor}
                fontSize="sm"
                fontWeight="700"
                color={textColor}
              >
                👋&nbsp; Hey, Adela
              </Text>
            </Flex>
            <Flex flexDirection="column" p="10px">
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius="8px"
                px="14px"
              >
                <Text fontSize="sm">Profile Settings</Text>
              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius="8px"
                px="14px"
              >
                <Text fontSize="sm">Newsletter Settings</Text>
              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                color="red.400"
                borderRadius="8px"
                px="14px"
                onClick={handleDisconnect}
              >
                <Text fontSize="sm">Disconnect</Text>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </>
    );
  return (
    <>
      <Button
        key={wallets?.[0]?.name}
        onClick={() => handleConnect(wallets?.[0])}
        px="20px"
        variant="brand"
        fontWeight="500"
      >
        Connect Wallet
      </Button>
    </>
  );
};
