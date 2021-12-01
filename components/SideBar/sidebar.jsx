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

import {
  AiFillSignal,
  AiFillFilePpt,
  AiOutlineWechat,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { SocialLinks } from "..";
//import CardDao from "../DaoCard/cardDoa";
//import { Logo } from "logo";

export default function Sidebar() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: useColorModeValue("gray.600", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("purple.200", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text
          fontSize="4xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          DAOlytics
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={AiFillSignal}>DashBoard</NavItem>
        <NavItem icon={AiFillFilePpt}>Proposals</NavItem>
        <NavItem icon={AiOutlineWechat}>News</NavItem>
        <NavItem icon={AiOutlineTeam}>Token Holders</NavItem>
        <NavItem icon={AiOutlineCalendar}>Events</NavItem>
      </Flex>

      <Flex
        pt={260}
        pr={2}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Button
          height="45px"
          width="150px"
          borderRadius="full"
          borderWidth={2}
          colorScheme="purple"
          size="md"
          fontSize="lg"
          leftIcon={<ChevronLeftIcon />}
        >
          DAOs List
        </Button>
      </Flex>

      <SocialLinks />

      <Flex
        pt={3}
        pr={2}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <IconButton
          borderRadius="full"
          borderWidth={2}
          colorScheme="purple"
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${text} mode`}
          ml={{ base: "0", md: "3" }}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          {/* <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>
           */}
          <Box
            as="iframe"
            src="https://coinhippo.io?widget=price-marquee&theme=?"
            title="Price Update"
            frameBorder="0"
            width="100%"
            height="35"
          />

          <Flex align="center">
            <Button colorScheme="purple" variant="outline">
              Connect Wallet
            </Button>
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}

          {/* <CardDao name={undefined} ticker={undefined} price={undefined} imgUrl={undefined} />  */}
        </Box>
      </Box>
    </Box>
  );
}
