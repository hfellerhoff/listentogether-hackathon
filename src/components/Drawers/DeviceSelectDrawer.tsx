import React, { useEffect, useState, useCallback } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Heading,
  DrawerBody,
  Flex,
  RadioButtonGroup,
  Spinner,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Stack,
  Link,
} from '@chakra-ui/core';
import { useRecoilValue, useRecoilState } from 'recoil';
import { spotifyApiState, accessTokenState } from '../../state';
import RadioOption from '../RadioOption';
import {
  FiRefreshCcw,
  FiGlobe,
  FiSpeaker,
  FiMonitor,
  FiSmartphone,
} from 'react-icons/fi';
import { displayedModalState } from '../../state/displayedModal';

interface Props {}

const DeviceSelectDrawer = (props: Props) => {
  const spotifyAPI = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);
  const [displayedModal, setDisplayedModal] = useRecoilState(
    displayedModalState
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isTransferingPlayback, setIsTransferingPlayback] = useState(false);
  const [devices, setDevices] = useState<SpotifyApi.UserDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  const onClose = () => setDisplayedModal(null);
  const isOpen = displayedModal === 'device-select';

  const getDevices = useCallback(async () => {
    if (spotifyAPI) {
      setIsLoading(true);
      spotifyAPI.setAccessToken(accessToken);
      const devicesResponse = await spotifyAPI.getMyDevices();
      setDevices(devicesResponse.devices);
      devicesResponse.devices.forEach((device) => {
        if (device.is_active) setSelectedDevice(device.id as string);
      });
      setIsLoading(false);
    }
  }, [accessToken, spotifyAPI]);

  useEffect(() => {
    if (isOpen) getDevices();
  }, [accessToken, getDevices, isOpen, spotifyAPI]);

  const updateSelectedDevice = async (device_id: string) => {
    if (spotifyAPI && device_id !== selectedDevice) {
      setIsTransferingPlayback(true);
      setSelectedDevice(device_id);
      await spotifyAPI.transferMyPlayback([device_id]);
      console.log('Successfully changed playback to ' + device_id);
      onClose();
      setIsTransferingPlayback(false);
    }
  };

  return (
    <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent p={[2, 4, 8, 8]}>
        <DrawerHeader>
          <Flex maxW={600} margin='0 auto'>
            <Heading flex={1}>Select Playback Device</Heading>
            <Button onClick={getDevices}>
              <FiRefreshCcw />
            </Button>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex
            direction='column'
            align='centre'
            justify='center'
            maxW={600}
            margin='0 auto'
          >
            {isLoading ? (
              <Flex align='center' justify='center' p={16}>
                <Spinner size='lg' />
              </Flex>
            ) : devices.length === 0 ? (
              <Alert
                status='info'
                variant='subtle'
                flexDirection='column'
                justifyContent='center'
                textAlign='center'
                height='200px'
                py={4}
                px={8}
              >
                <AlertIcon size='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                  Can't listen together if you have nothing to listen on!
                </AlertTitle>
                <AlertDescription>
                  Looks like you don't have any available devices. Try opening
                  up Spotify on one of your devices, or swap to a browser that
                  supports{' '}
                  <Link
                    fontWeight={600}
                    href='https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Spotify's Web Playback SDK.
                  </Link>
                </AlertDescription>
              </Alert>
            ) : (
              <Box>
                <RadioButtonGroup
                  isInline
                  width='100%'
                  onChange={(e) => updateSelectedDevice(e as string)}
                  value={selectedDevice}
                >
                  {devices.map((device, index) => {
                    let leftIcon = <FiSpeaker fontSize={20} />;
                    if (device.name === 'Listen Together Web Application') {
                      leftIcon = <FiGlobe fontSize={20} />;
                    } else if (device.type === 'Computer') {
                      leftIcon = <FiMonitor fontSize={20} />;
                    } else if (device.type === 'Smartphone') {
                      leftIcon = <FiSmartphone fontSize={20} />;
                    }
                    return (
                      <RadioOption
                        value={device.id as string}
                        title={device.name}
                        description={device.type}
                        key={index}
                        isDisabled={isTransferingPlayback}
                        leftIcon={leftIcon}
                      />
                    );
                  })}
                </RadioButtonGroup>
                <Box textAlign='center'>
                  {isTransferingPlayback ? (
                    <Stack align='center' p={4}>
                      <Spinner size='md' />
                      <Text>Transfering playback...</Text>
                    </Stack>
                  ) : (
                    <Text maxW='md' margin='0 auto'>
                      Looking for a device that isn't here? Try opening up
                      Spotify on one of your devices, or swap to a browser that
                      supports{' '}
                      <Link
                        fontWeight={600}
                        href='https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Spotify's Web Playback SDK.
                      </Link>
                    </Text>
                  )}
                </Box>
              </Box>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DeviceSelectDrawer;
