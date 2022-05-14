import React from 'react';
import {TouchableOpacity, Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './RootNavigation';
import Home from './screens/Home';
import AddItem from './screens/AddItem';
import * as RootNavigation from './RootNavigation';
import Colors from './theme/colors';

StatusBar.setBarStyle('light-content', true);

const Stack = createNativeStackNavigator();
const addIcon = require('./assets/images/outline_add_white_24dp.png');

export default function AppNavigation() {
  const onPressAdd = () => {
    RootNavigation.navigate('AddItem');
  };

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: Colors.gray20},
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold'},
          }}>
          <Stack.Group>
          <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title:"",
                headerRight: () => (
                  <TouchableOpacity onPress={(onPressAdd)}>
                    <Image source={addIcon} />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="AddItem"
              component={AddItem}
              options={{
                title:"",
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            {/* Add full screen modals here */}
            {/* <Stack.Screen name="MyModal" component={ModalScreen} /> */}
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
