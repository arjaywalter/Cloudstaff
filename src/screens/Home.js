import React, { useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import { getTopStories } from '../store/reducers/storySlice';

function Home({ navigation }) {
  const dispatch = useDispatch();
  const {
    // isFetching,
    // isSuccess,
    // isError,
    // errorMessage,
    data,
  } = useSelector(state => state.story);

  useEffect(() => {
    dispatch(getTopStories({}));
  }, []);

  const showAlert = () =>
  Alert.alert(
    "hello world",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const renderItem = ({ item }) => {
    const { id, name, image, description, date } = item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            onPressUserImage(comment.owner);
          }}>
          <Image
            style={styles.image}
            source={{ uri: image }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={styles.itemContainer}>
            <View style={{
              flex: 1,
              paddingVertical: 12,
            }}>
              <Text style={styles.title}>{name}</Text>
              <Text>{description}</Text>
              <Text style={styles.date}>{moment(date).format('ddd DD MMM, h a')}</Text>
            </View>
            <TouchableOpacity
              style={{ paddingEnd: 16 }}
              onPress={() => {
                showAlert();
              }}>
              <Icon
                name="more-horiz"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
    );
  };

  const renderList = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );

  return renderList();
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    marginHorizontal: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  date: { color: 'gray' },
  divider: {
    height: 0.6,
    backgroundColor: 'gray',
  },
});

export default Home;
