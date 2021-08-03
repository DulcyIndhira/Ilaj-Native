import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../Core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 90,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingLeft:40
  },
});

export default memo(Header);