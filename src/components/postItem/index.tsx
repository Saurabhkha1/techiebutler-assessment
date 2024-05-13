import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '@src/utils/colors';
import {moderateScale} from '@src/utils/helper';

type PostItemProps = {
  post: {
    id: number;
    title: string;
  };
  onPress: () => void;
};

const expensiveCalculation = (num: number): number => {
  let sum = 0;
  for (let i = 0; i < num * 100000; i++) {
    sum++;
  }
  return sum;
};

export const PostItem: React.FC<PostItemProps> = ({post, onPress}) => {
  const computedDetail = useMemo(() => {
    const startTime = Date.now();
    const result = expensiveCalculation(post?.id);
    const endTime = Date.now();
    console.log(
      `Heavy computation time for item ${post?.id}: ${endTime - startTime}ms`,
    );
    return result;
  }, [post?.id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text>ID: {post?.id}</Text>
        <Text>Title: {post?.title}</Text>
        <Text>Computed Detail: {computedDetail}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: Colors.secondary,
    borderRadius: moderateScale(5),
  },
});
