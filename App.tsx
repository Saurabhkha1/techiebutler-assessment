import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {EmptyViewComponent, ItemDetails, PostItem} from '@src/components';
import {API_ENDPOINT} from '@src/utils/constants';
import {makeNetworkCall} from '@src/network';
import {height} from '@src/utils/helper';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostData, setSelectedPostData] = useState<Post | null>(null);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const response = await makeNetworkCall(API_ENDPOINT);
      setPosts(response);
    } catch (e) {
      console.error('Error fetching data:', e);
      setError(e instanceof Error ? e.message : 'Unknown error occurred');
    }
  }, []);

  const fetchPostDetails = useCallback(async (postId: number) => {
    try {
      const response = await makeNetworkCall(`${API_ENDPOINT}/${postId}`);
      setSelectedPostData(response);
    } catch (e) {
      console.error('Error fetching post details:', e);
      setError(e instanceof Error ? e.message : 'Unknown error occurred');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePostPress = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Post}) => (
      <PostItem post={item} onPress={() => handlePostPress(item.id)} />
    ),
    [handlePostPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        windowSize={height}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <EmptyViewComponent error={error} reloadFunction={fetchData} />
        }
      />
      {selectedPostId && (
        <ItemDetails
          postId={selectedPostId}
          postData={selectedPostData}
          fetchPostDetails={fetchPostDetails}
          closePost={() => {
            setSelectedPostId(null);
            setSelectedPostData(null);
          }}
          error={selectedPostId !== selectedPostData?.id && error}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
