import React, { useState, useEffect } from 'react';
import { Box, useFocus, Text } from 'ink';
import { DataSource } from 'typeorm';

import Menu from '../Menu';
import { NameMenuItem } from '../Menu/types';
import Header from '../Header';
import Content from '../Content';
import { connection } from '../../utils/data-source';


const App = () => {
	const { isFocused } = useFocus({ autoFocus: true });
	const [activeTab, setActiveTab] = useState(NameMenuItem.SHOW);
	const [dataSource, setDataSource] = useState<DataSource>(null);
	const [connectionError, setConnectionError] = useState<string>('');

	const handleChangeTab = (name: NameMenuItem) => {
		setActiveTab(name);
	};

	useEffect(() => {
		const getDataSource = async () => {
			setDataSource(await connection());
		}
		getDataSource().catch((error: Error) => {
			setConnectionError(error.message);
		});
	}, [setDataSource, setConnectionError]);

	if (connectionError) {
		return (
			<Box padding={1}>
				<Text backgroundColor="red">{connectionError}</Text>
			</Box>
		);
	}

	if (!dataSource) {
		return <Text>Loading connection DB</Text>
	}

  return ( 
		<>
			<Box width={100} flexDirection="column">
				<Header />
				<Box width={100}>
					<Menu
						activeTab={activeTab}
						onChange={handleChangeTab}
						isFocused={isFocused}
					/>
					<Content dataSource={dataSource} activeTab={activeTab} />
				</Box>
			</Box>
		</>
	);
};

export default App;