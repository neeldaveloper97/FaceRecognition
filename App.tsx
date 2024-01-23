/**
 * Application Entrypoint
 */
import React from 'react-native';
import RootNavigation from '@/navigation/RootNavigation';
import {appStore} from '@/redux/appStore';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ApplicationStoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {LightAppTheme} from '@/theme/AppTheme';

function App() {
  return (
    <ApplicationStoreProvider store={appStore}>
      <PaperProvider theme={LightAppTheme}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </ApplicationStoreProvider>
  );
}

export default App;
