/**
 * Application Entrypoint
 */
import React from 'react-native';
import RootNavigation from '@/navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {LightAppTheme} from '@/theme/AppTheme';

function App() {
  return (
    <PaperProvider theme={LightAppTheme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
