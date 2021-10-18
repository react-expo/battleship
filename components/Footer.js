import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default class Footer extends React.Component {
  render() {
      return (
    <View style={styles.footer}>
      <Text style={styles.author}> Author: Kati Mäkelä</Text>
      
    </View>
  );
}
}