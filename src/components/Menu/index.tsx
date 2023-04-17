import React, { FC } from 'react';
import { Box, Text } from 'ink';
import { Tab, Tabs } from 'ink-tab';

import { IMenuProperties } from './types';
import styles from './styles';
import { menuItems } from './constants';

const Menu: FC<IMenuProperties> = (properties) => {
  const { onChange, isFocused, activeTab } = properties;

  const handleChangeTab = (name: string) => {
    onChange(name);
  };

  const items = menuItems.map((item) => (
    <Tab name={item.value}>{item.label}</Tab>
  ));

  return (
    <Box {...styles.container}>
      <Box marginBottom={1}>
        <Text {...styles.title}>Menu</Text>
      </Box>
      <Tabs
        onChange={handleChangeTab}
        flexDirection="column"
        defaultValue={activeTab}
        isFocused={isFocused}
        showIndex={false}
      >
        {...items}
      </Tabs>
    </Box>
  );
}

export default Menu;