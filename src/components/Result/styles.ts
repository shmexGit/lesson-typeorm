import { BoxProps } from 'ink';

const styles = {
  container: {
    flexDirection: 'column',
  } as BoxProps,
  title: {
    paddingLeft: 1,
    borderStyle: 'single',
  } as BoxProps,
  titleText: {
    bold: true,
    backgroundColor: 'blue',
  },
  data: {
    paddingLeft: 2,
  } as BoxProps,
};

export default styles;