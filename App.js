
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import CameraComponent from './components/CameraComponent';
import Main from './components/Main';
import GalleryRoll from './components/GalleryRoll';
import VideoComponent from './components/VideoComponent';
import CameraRoll from 'rn-camera-roll';


const App = StackNavigator(
  {
    Main: {
      screen: Main,
    },
    CameraComponent: {
      screen: CameraComponent,
    },
    GalleryRoll: {
      screen: GalleryRoll,
    },
    VideoComponent: {
      screen: VideoComponent,
    }
  },
  
);

export default App;


