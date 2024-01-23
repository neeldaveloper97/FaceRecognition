/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {CAPTURED_FACE, Storage} from '@/utils/Storage';

export default function CaptureScreen() {
  const navigation = useNavigation();
  const camera = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const deviceCamera = useCameraDevice('front', {
    physicalDevices: ['telephoto-camera'],
  });

  const onPressCapture = async () => {
    const photo = await camera.current?.takePhoto({
      qualityPrioritization: 'quality',
    });
    // Store face data in device storage
    Storage.set(
      CAPTURED_FACE,
      JSON.stringify({
        uri: `file://${photo?.path}`,
        name: Date.now().toString().concat('.jpg'),
        type: 'image/jpeg',
      }),
    );
    navigation.goBack();
  };

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!deviceCamera || !hasPermission) {
    return (
      <SafeAreaView>
        <Text>Device Camera Not Found</Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.screenLayout}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={deviceCamera}
        isActive={true}
        photo
        orientation="landscape-left"
      />
      <View style={styles.captureButtonLayout}>
        <IconButton
          style={styles.captureButton}
          size={50}
          icon={() => <MaterialIcons name="camera" size={40} />}
          onPress={onPressCapture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    position: 'relative',
  },
  captureButtonLayout: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  captureButton: {
    backgroundColor: 'white',
  },
});
