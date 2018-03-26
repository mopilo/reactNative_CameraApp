import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

let startVideo = false;

export default class VideoComponent extends Component {

    static navigationOptions = { header: null,};
    constructor(){
        super();
        this.state= {
            captureMode: Camera.constants.CaptureMode.video
        };
        isRecording: false;
        timer: 0;
    }

startVideoRecording() 
{
    this.refs.camera.capture({mode: this.state.captureMode})
    .then((data) => console.log(data))
    .catch(err => console.error(err));
}
startRecord(){ startVideo = setTimeout(this.startVideoRecording.bind(this), 50);}

endVideo(){ this.refs.camera.stopCapture(); }
render(){
    return(
        <Camera
            ref= "camera"
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
            <TouchableOpacity style={styles.capture} onPress={this.startRecord.bind(this)}>
            <Text onPress={this.endVideo.bind(this)}> Stop recording </Text>           
            </TouchableOpacity>
        </Camera>
    );
}
}


const styles = StyleSheet.create({
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
      }
     
});