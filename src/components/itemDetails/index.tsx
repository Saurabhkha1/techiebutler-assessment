import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Post} from 'App';
import {Loader} from '../loader';
import {moderateScale} from '@src/utils/helper';
import {Colors} from '@src/utils/colors';

type ItemDetailsProps = {
  postId: number;
  fetchPostDetails: (postId: number) => void;
  postData: Post | null;
  closePost: () => void;
  error: string | boolean;
};

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  postId,
  postData,
  fetchPostDetails,
  closePost,
  error,
}) => {
  useEffect(() => {
    console.log('ItemDetails rerendered', postId, postData);
  }, [postId, postData]);

  useEffect(() => {
    fetchPostDetails(postId);
  }, [fetchPostDetails, postId]);

  return (
    <ScrollView style={styles.container}>
      {postData ? (
        typeof error === 'string' && error?.length ? (
          <View style={styles.errorView}>
            <Text style={styles.detailsText}>
              Some error in fetching the data for post {postId}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.detailsHeading}>Details of Post {postId}</Text>
            <Text style={styles.detailsText}>User Id : {postData?.userId}</Text>
            <Text style={styles.detailsText}>Title : {postData?.title}</Text>
            <Text style={styles.detailsText}>Details : {postData?.body}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closePost}>
              <Image source={require('../../assets/closeIcon.png')} />
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    backgroundColor: Colors.sheet,
    borderTopWidth: 1,
    borderColor: Colors.primary,
    height: moderateScale(400),
  },
  detailsHeading: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.primary,
  },
  detailsText: {
    color: Colors.primary,
    marginVertical: moderateScale(10),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  errorView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
