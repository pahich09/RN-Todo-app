import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen';
import {TodoScreen} from './src/screens/TodoScreen';
import {THEME} from './src/theme';
import {TodoState} from './src/context/todo/todoState';
import {MainLayout} from './src/MainLayout';
import {TodoContext} from './src/context/todo/todocontext';
import {ScreenState} from './src/context/screen/screenState';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {

  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={loadApplication}
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />;
  }


  return (
    <ScreenState>
      <TodoState>
        <MainLayout/>
      </TodoState>
    </ScreenState>
  );
}


