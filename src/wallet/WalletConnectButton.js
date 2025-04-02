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
  useSignPersonalMessage,
  useWallets,
} from '@mysten/dapp-kit';
import { addressShortener } from 'utils';
import { useEffect } from 'react';
import { useAppContext } from 'contexts/AppContext';
import { postData } from 'api';

export const CustomConnectButton = () => {
  const toast = useToast();
  const { mutate: connect, isError, error } = useConnectWallet();
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const wallets = useWallets();
  const { accounts, setAccounts } = useAppContext();

  const handleConnect = async (wallet) => {
    try {
      const result = await new Promise((resolve, reject) => {
        connect(
          { wallet },
          {
            onSuccess: (data) => {
              console.log('Connected:', data);
              resolve(data);
            },
            onError: reject,
          },
        );
      });

      const accountList = result.accounts;
      setAccounts(accountList);

      if (accountList?.length > 0) {
        // You can now send `signedMessage` to your backend for verification
        // await postData('/auth', {
        //   walletAddress: currentAccount.address,
        //   message,
        //   signedMessage,
        // });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to retrieve account address after connection.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to connect or sign message:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to connect or sign the message.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
  useEffect(() => {
    (async () => {
      if (currentAccount?.address) {
        console.log('Current Account:', currentAccount.address);

        const message = `Login to VisionaryAI\nTimestamp: ${new Date().toISOString()}`;
        const encoded = new TextEncoder().encode(message);

        const signedMessage = await new Promise((resolve, reject) => {
          signPersonalMessage(
            { message: encoded },
            {
              onSuccess: (data) => resolve(data),
              onError: (err) => reject(err),
            },
          );
        });

        console.log('Signed Message:', signedMessage);
        toast({
          title: 'Success',
          description: 'Message signed successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        await postData('/api/auth', {
          walletAddress: currentAccount.address,
          message,
          signature: signedMessage?.signature,
        });
      }
    })();
  }, [currentAccount?.address]);

  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');

  if (currentAccount)
    return (
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
          <Flex flexDirection="column" p="10px">
            <MenuItem
              bg="none"
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm">Settings</Text>
            </MenuItem>
            <MenuItem
              bg="none"
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
    );

  return (
    <Button
      key={wallets?.[0]?.name}
      onClick={() => handleConnect(wallets?.[0])}
      px="20px"
      variant="brand"
      fontWeight="500"
    >
      Connect Wallet
    </Button>
  );
};
