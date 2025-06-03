import React from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';

const CustomStatusBar = ({ backgroundColor, barStyle = 'dark-content' }) => {
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      
      <SafeAreaView style={[styles.statusBar, { backgroundColor }]}>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
    width: '100%',
  },
});

export default CustomStatusBar;