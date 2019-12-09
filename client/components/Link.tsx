import React from 'react';
import { Flex, Box, Text, Link as RebassLink } from 'rebass/styled-components';
import NextLink from 'next/link';

interface Props {}

const Link: React.FC<Props> = () => {
  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        Rebass
      </Text>
      <Box mx="auto" />
      <NextLink>
        <RebassLink variant="nav" href="#!">
          Profile
        </RebassLink>
      </NextLink>
    </Flex>
  );
};

export default Link;
