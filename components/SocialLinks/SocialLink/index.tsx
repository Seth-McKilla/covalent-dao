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


import { AiFillSignal, AiFillFilePpt, AiOutlineWechat, AiOutlineTeam, AiOutlineCalendar } from "react-icons/ai";
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { ChevronLeftIcon } from '@chakra-ui/icons'


import React, {ReactNode} from "react";


export default function SocialLink ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};