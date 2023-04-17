import React, { FC } from 'react';
import { Box, Text } from 'ink';
import Table from 'ink-table';

import styles from './styles';
import { IResultProperties } from './types';

const Result: FC<IResultProperties> = (properties) => {
  const { error, data } = properties;
  const isError = Boolean(error);
  
  return (
   <Box {...styles.container}>
     <Box {...styles.title}>
      <Text {...styles.titleText}>Result</Text>
    </Box>
    <Box {...styles.data}>
      {isError ? <Text backgroundColor="red">{error}</Text> : <Text>{JSON.stringify(data)}</Text>}
    </Box>
   </Box>
  );
};

export default Result;