
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';


export default class Main extends Component {

    static navigationOptions = {
        header: null ,
      };
      
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <ImageBackground style={styles.backGroundImage}
            source={require('../images/backgr.jpg')}>
            <View style={styles.textComp}>
              <Text style={styles.text}>PHOTO EDITOR</Text>
            </View>
            {/* Container */}
            <View style={styles.tabBar}>

              {/* Camera */}
              <TouchableOpacity style={styles.tabItem} onPress={() => navigate('CameraComponent')}>
                <Icon name="photo-camera" size={40} style={{color: 'white'}}/>
                <Text style={styles.tabBarText}>Camera</Text>
              </TouchableOpacity>

              {/* gallery */}
              <TouchableOpacity style={styles.tabItem} onPress={()=> navigate('GalleryRoll')}>
                <Icon name="photo" size={40} style={{color: 'white'}}/>
                <Text style={styles.tabBarText}>Gallery</Text>
              </TouchableOpacity>

              {/* video */}
              <TouchableOpacity style={styles.tabItem} onPress={()=> navigate('VideoComponent')}>
                <Icon name="videocam" size={40} style={{color: 'white'}}/>
                <Text style={styles.tabBarText}>Video</Text>
              </TouchableOpacity>
              
            </View>

          </ImageBackground>
        
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  textComp: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    
    },
  backGroundImage:{
    opacity: 0.7,
    flexGrow:1,
    alignItems: 'center',
    justifyContent:'flex-end',
  },

  tabBar: {
    height: 130,
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'flex-end',
    backgroundColor: 'rgba(0,0,0, 0.6)',    
  },
  text:{
    fontSize: 40,
    color: 'white',
    fontFamily: 'Raleway-Black'
  },
  tabBarText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Raleway-Light'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});




