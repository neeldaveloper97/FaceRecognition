import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@/types/navigation/IAppNavigation';
export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <ImageBackground
      style={styles.screenLayout}
      source={require('@/assets/images/starter_image.jpg')}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CaptureScreen')}>
        Upload Face
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('FaceIdentify')}>
        Face Identify
      </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    rowGap: 8,
    paddingHorizontal: 16,
  },
});
