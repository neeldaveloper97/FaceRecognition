/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useRef, useState} from 'react';
import {CAPTURED_FACE, Storage} from '@/utils/Storage';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  Dialog,
  IconButton,
} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '@/constants';

export default function FaceIdentify() {
  const [identifyingFace, setIdentifyingFace] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const camera = useRef<Camera>(null);

  const deviceCamera = useCameraDevice('front', {
    physicalDevices: ['telephoto-camera'],
  });

  const onDetectFace = async () => {
    setIdentifyingFace(true);
    const storedFaceData = JSON.parse(
      Storage.getString(CAPTURED_FACE) || 'null',
    );
    const photo = await camera.current?.takePhoto();

    const formData = new FormData();
    formData.append('image1', storedFaceData);
    formData.append('image2', {
      uri: `file://${photo?.path}`,
      name: Date.now().toString().concat('.jpg'),
      type: 'image/jpeg',
    });

    try {
      // Face compare API
      const {data} = await axios.post(`${BASE_URL}/compare_faces`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatusMessage(
        data.result === 'Face not found'
          ? data.result
          : data.result
          ? 'Face detected'
          : 'Face not detected',
      );
    } catch (error: any) {
      setStatusMessage('Something went wrong.');
    } finally {
      setIdentifyingFace(false);
    }
  };

  if (!deviceCamera) {
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
        style={{flex: 1}}
        device={deviceCamera}
        isActive={true}
        photo
        orientation="landscape-left"
      />
      <View style={styles.captureButtonLayout}>
        <IconButton
          style={styles.captureButton}
          size={50}
          icon={() => <MaterialIcons name="camera" size={40} color="#FFF" />}
          onPress={onDetectFace}
        />
      </View>

      {identifyingFace && (
        <View style={styles.loadingLayout}>
          <ActivityIndicator animating color="black" />
          <Text>Detecting Face...</Text>
        </View>
      )}

      <Dialog visible={statusMessage.length > 0}>
        <Dialog.Title>Face Identification</Dialog.Title>
        <Dialog.Content>
          <Text>{statusMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => setStatusMessage('')}
            labelStyle={styles.actionButton}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
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
    backgroundColor: '#FFFFFF',
  },
  captureButton: {
    backgroundColor: '#000000',
  },
  loadingLayout: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
    columnGap: 8,
    position: 'absolute',
  },
  actionButton: {
    color: '#000000',
  },
});
