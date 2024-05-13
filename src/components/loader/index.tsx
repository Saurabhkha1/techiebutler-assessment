import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from '@src/utils/colors';

export const Loader = () => {
  return <ActivityIndicator color={Colors.black} size={'large'} />;
};
