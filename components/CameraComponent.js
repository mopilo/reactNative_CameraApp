import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation'


  export default class CameraComponent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        path: null,
      };
    }

    static navigationOptions = { header: null,};

    takePicture() {
      this.camera.capture()
        .then((data) => {
          console.log(data);
          this.setState({ path: data.path })
        })
        .catch(err => console.error(err));
    }
  
    renderCamera() {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
        >
          <TouchableHighlight
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View />
          </TouchableHighlight>
        </Camera>
      );
    }
  
    renderImage() {
      return (
        <View>
          <Image
            source={{ uri: this.state.path }}
            style={styles.preview}
          />
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => this.setState({ path: data.path  })}>
                <Icon name="close" size={30} style={{color: 'white'}}/>
          </TouchableOpacity>

           <TouchableOpacity
            style={styles.cancel}
            onPress={() => console.log("next")}>
                <Icon name="arrow-forward" size={30} style={{color: 'white', marginTop: 50}}/>
          </TouchableOpacity>

        </View>
      );
    }
  
    render() {
      return (
        <View style={styles.container}>
          {this.state.path ? this.renderImage() : this.renderCamera()}
        </View>
      );
    }
  };
  

  {/*------------------- styling ---------------------*/}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    capture: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 5,
      borderColor: '#FFF',
      marginBottom: 15,
    },
    cancel: {
      position: 'absolute',
      right: 20,
      top: 20,
      backgroundColor: 'transparent',
      color: '#FFF',
      fontWeight: '600',
      fontSize: 17,
    }
  });