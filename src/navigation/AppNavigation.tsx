import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from '@/types/navigation/IAppNavigation';
import HomeScreen from '@/screens/app/HomeScreen';
import CaptureScreen from '@/screens/app/CaptureScreen';
import FaceIdentify from '@/screens/app/FaceIdentify';

const AppStack = createStackNavigator<AppStackParamList>();
export default function AppNavigation() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name="CaptureScreen"
        component={CaptureScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name="FaceIdentify"
        component={FaceIdentify}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}
