import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '@/types/navigation/IAuthNavigation';
import LoginScreen from '@/screens/auth/LoginScreen';

const AuthStack = createStackNavigator<AuthStackParamList>();
export default function AuthNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
