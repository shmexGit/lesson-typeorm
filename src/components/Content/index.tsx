import React, { FC, useEffect, useState } from 'react';
import { Box, Text } from 'ink';

import Result from '../Result';
import { NameMenuItem } from '../Menu/types';

import { IContentProperties } from './types';
import styles from './styles';

const Content: FC<IContentProperties> = (properties) => {
  const { activeTab, dataSource } = properties;
  const [result, setResult] = useState(null);
  const [queryError, setQueryError] = useState<string>('');

  useEffect(() => {
		const getQuery = async () => {
			setResult(await dataSource.query('SELECT 1 + 1'));
		}
		getQuery().catch((error: Error) => {
			setQueryError(error.message);
		});
	}, [setResult, setQueryError]);

  return (
    <Box {...styles.container}>
      <Box {...styles.title}>
        <Text {...styles.titleText}>
          {activeTab === NameMenuItem.ADD && 'Form Add'}
          {activeTab === NameMenuItem.SHOW && 'Form Show'}
          {activeTab === NameMenuItem.REMOVE && 'Form Remove'}
          {activeTab === NameMenuItem.UPDATE && 'Form Update'}
        </Text>
      </Box>
      <Box paddingLeft={2}>
        <Text>
          {activeTab === NameMenuItem.ADD && 'Selected tab is "add"'}
          {activeTab === NameMenuItem.SHOW && 'Selected tab is "show"'}
          {activeTab === NameMenuItem.REMOVE && 'Selected tab is "remove"'}
          {activeTab === NameMenuItem.UPDATE && 'Selected tab is "update"'}
          {activeTab === NameMenuItem.HELP && 'Selected tab is "help"'}
        </Text>
      </Box>
      <Result error={queryError} data={result} />
    </Box>
  );
};

export default Content;
