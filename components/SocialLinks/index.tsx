/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Button,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Stack,
  chakra,
  VisuallyHidden,
  useColorMode,
} from "@chakra-ui/react";

import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

import SocialLink from './SocialLink'


function SocialLinks() {
    return (
      
      <Flex
        pt={10}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
        
      >
        <Stack direction={'row'} spacing={6}>
            <SocialLink label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialLink>
            <SocialLink label={'Discord'} href={'#'}>
              <FaDiscord />
            </SocialLink>
            <SocialLink label={'Github'} href={'#'}>
              <FaGithub />
            </SocialLink> 
          </Stack>
      </Flex>
    )
}

export default SocialLinks;
