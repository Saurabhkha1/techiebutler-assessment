import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Loader} from '../loader';
import {moderateScale} from '@src/utils/helper';
import {Colors} from '@src/utils/colors';

type Props = {
  error: string;
  reloadFunction: () => void;
};

export const EmptyViewComponent = ({error, reloadFunction}: Props) => {
  return (
    <View style={styles.container}>
      {error?.length ? (
        <View style={styles.errorView}>
          <Text style={styles.errorStyle}>{error}</Text>
          <TouchableOpacity
            style={[styles.errorView, styles.reloadButton]}
            onPress={reloadFunction}>
            <Text style={styles.errorStyle}>Reload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(20),
  },
  errorView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorStyle: {
    fontSize: moderateScale(20),
    color: Colors.black,
  },
  reloadButton: {
    padding: moderateScale(10),
    backgroundColor: Colors.sheet,
    borderRadius: moderateScale(10),
    marginTop: 10,
  },
});
