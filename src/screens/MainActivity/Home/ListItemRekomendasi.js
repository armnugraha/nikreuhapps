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
  TextInput
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

// Screen Styles
import styles from "./styles";

export default class ListItemRekomendasi extends Component {

  showDetail(data){
    Actions.gunung_detail({dataProps:data});
  }

  render(){

    var { rowData } = this.props;

    return (
      <View style={styles.rowMain}>
        <TouchableOpacity
          style={styles.cardImage}
          onPress={() =>
            // this.onLearnMore(rowData.name, rowData.watch, rowData.distance)
            this.showDetail(rowData)
          }
        >
          {/* <ImageBackground
            source={Images.No_image_found}
            style={{width: '100%', height: '100%'}}
          >  */}
            <Image style={styles.cardBgImage} source={rowData.destinationImg} />
          {/* </ImageBackground> */}

          <View style={styles.postDetailBg}>
            <View style={styles.profileDetailBg}>
              <Text style={styles.nameTxt}>{rowData.destinationName}</Text>
              <View style={styles.watchDistanceBg}>
                <View style={styles.mapPin}>
                  <FontAwesome name="map-marker" size={12} color="white" />
                </View>
                <Text style={styles.watchDistanceTxt}>{rowData.place}</Text>
              </View>
              <View style={styles.watchDistanceBg}>
                <Stars
                  half={true}
                  rating={4.0}
                  update={(val)=>{this.setState({stars: val})}}
                  spacing={4}
                  starSize={20}
                  count={5}
                  disabled={true}
                  fullStar={Images.starFilled1}
                  emptyStar={Images.starEmpty1}
                  halfStar={Images.starHalf1} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}