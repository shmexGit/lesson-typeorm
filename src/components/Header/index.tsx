import React from 'react';
import { Box, Text } from "ink";

import styles from './styles';

const Header = () => {
  return (
    <Box {...styles.container}>
      <Box flexDirection="column">
        <Text bold>Course NodeJS</Text>
        <Text italic>Lesson TypeORM</Text>
      </Box>
    </Box>
  );
};

export default Header;