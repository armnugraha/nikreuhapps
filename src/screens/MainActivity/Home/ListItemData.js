import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  I18nManager,
  BackHandler,
  TextInput,
  FlatList
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Title,
  Separator
} from "native-base";
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";
import { Actions } from "react-native-router-flux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Images, Metrics, Fonts, Colors } from "../../../resources/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Stars from 'react-native-stars';
import Api from '../../../libs/Api';
import { CachedImage } from "react-native-cached-image";

// Screen Styles
import styles from "./styles";

const cardBgOne = { uri: "https://i.imgur.com/6gs6CWz.png" };

export default class ListItemData extends Component {

  showDetail(data){
    Actions.gunung_detail({dataProps:data, img: cardBgOne});
  }
  
  render(){
    var { img, name, address} = this.props;

    return (
      <TouchableOpacity
        style={styles.listMainview}
        onPress={() =>
          this.showDetail(this.props)
        }
      >
        <View style={{backgroundColor:"#FFF", borderRadius: 8}}>
        <CachedImage
          source={{uri: img}}
          style={styles.destinationimg}
        >
          <TouchableOpacity />
        </CachedImage>
          <Text numberOfLines={1} style={styles.destinationnamelist}>
            {name}
          </Text>
          <View style={styles.placeDistanceBg}>
            <View style={styles.mapPin}>
              <FontAwesome name="map-marker" size={12} color="#b7b7b7" />
            </View>
            <Text numberOfLines={1} style={styles.placeDistanceTxt}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}