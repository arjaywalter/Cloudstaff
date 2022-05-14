import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Colors from '../theme/colors';
import { addItem } from '../store/reducers/storySlice';

function AddItem({ navigation }) {
  const dispatch = useDispatch();

  return <View style={styles.container}>
    <TextInput
      style={{ padding: 16 }}
      placeholder="enter name:"
      returnKeyType={'done'}
      onSubmitEditing={(event) => {
        var date = moment().format('YYYY-MM-DDTHH:mm:ss');
        const item = {
          image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG',
          name: event.nativeEvent.text,
          description: 'Rrrr',
          date,
        };
        dispatch(addItem({ item }));
        navigation.pop();
      }}
    />
  </View>;
};

const styles = StyleSheet.create({
  container: { margin: 16, backgroundColor: Colors.white },
});

export default AddItem;
