import Link from "next/link";
import React from "react";
import { Text, Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";
//import { motion } from "framer-motion";
import daoList from "../../constants/daoList";
import _ from "lodash";




export default function CardDao({ name, ticker, price, imgUrl }){
  const dao = _.find(daoList, {
    contractTicker: _.toUpper(ticker),
  });

  return (
    <Link
      href={`/${dao.chainId}/${dao.contractAddress}`}
      passHref
      prefetch={false}
      >
        
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
        >
          <Image
            src={imgUrl}
            alt={name}
            roundedTop="lg" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Box
                gutterBottom
                as="h4"
                color="white"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xl"
                textTransform="uppercase"
                ml="2"
                width="100%"
              >
                {`${name.replace("Token", "")}`}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {ticker}
            </Box>

            <Box  >
              <Text variant="h6" color="green.500">{`$${price}`}</Text>
              <Box as="span" color="gray.600" fontSize="sm">
                
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
      
      </Link>
  );
};

