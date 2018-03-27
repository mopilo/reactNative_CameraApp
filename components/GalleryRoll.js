import React, {Component} from 'react';
import {
  Image,
  Platform,
  PropTypes,
  ListView,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button
} from 'react-native';
import CameraRoll from 'rn-camera-roll';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 120,
    margin: 3,
  },
  imageEditorStyle: {
    height: 400,
    width: 600
  }

};

let PHOTOS_COUNT_BY_FETCH = 100;

export default class GalleryRoll extends Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photo:"",
    }
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.lastPhotoFetched = undefined;
    this.images = [];
    this.state = this.getDataSourceState();
    this.fetchPhotos();
  
  }



  getDataSourceState() {
    return {
      dataSource: this.ds.cloneWithRows(this.images),
    };
  }

  getPhotosFromCameraRollData(data) {
    return data.edges.map((asset) => {
      return asset.node.image;
    });
  }

  onPhotosFetchedSuccess(data) {
    const newPhotos = this.getPhotosFromCameraRollData(data);
    console.log(data);
    this.images = this.images.concat(newPhotos);
    this.setState(this.getDataSourceState());
    if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
  }

  onPhotosFetchError(err) {
    // Handle error here
    console.log(err);
  }

  fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
    CameraRoll.getPhotos({
      first: count,
      after
    }, this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this));
  }

  onEndReached() {
    this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched);
  }

  setModalVisible(uriImages){
    this.setState({modalVisible: !this.state.modalVisible});
    this.setState({photo: uriImages});
    console.log(uriImages);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.imageGrid}
          dataSource={this.state.dataSource}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={100}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          renderRow=
          {(image) => 
            {
              return (
                  <View>
                    <TouchableHighlight key={image.uri}
                    onPress={() => {
                      {/*passing the clicked image to function */}
                      this.setModalVisible(image.uri);
                    }}>
                    <Image
                      style={styles.image}
                      source={{ uri: image.uri }}/></TouchableHighlight>
                  </View>
          )}}>
<Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed!")}}
      >
        <View>
          <Image
            style={styles.imageEditorStyle}
            source={{uri: this.state.photo}}
          />
          <Button
            onPress={() => this.setState({modalVisible: false})}
            title="Cancel"
            color="#841584"
          />
        </View>
      </Modal>
        </ListView>  
         
             
      </View>
    );
  }
}