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
  BackHandler
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
  Footer,
  FooterTab,
  Icon
} from "native-base";
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";

// Screen Styles
import styles from "./styles";
import { Images, Metrics, Fonts, Colors } from "../../../resources/Themes";

const bgImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVVEBl0HmbNaD_77Js-WK1s_ADu-5a1pG_jrXzUGEV9d4MHUB_w";
const contentBg =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_img03_s21_29.jpg";
const cardBgOne =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_img02_s21_29.jpg";
const cardBgTwo =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_img04_s21_29.jpg";
const cardBgThree =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_img03_s21_29.jpg";
const profileImgOne =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_propic01_s21_29.png";
const profileImgTwo =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_propic04_s21_29.png";

export default class NearByDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      Option: [
        {
          id: 1,
          name: "View Profile"
        },
        {
          id: 2,
          name: "Message"
        },
        {
          id: 3,
          name: "Block User"
        },
        {
          id: 4,
          name: "Report User"
        }
      ],
      isLike: true
    };
  }

  componentWillMount() {
    AsyncStorage.multiGet(["Name", "WatchCount", "Distance"]).then(data => {
      this.setState({
        Name: data[0][1],
        WatchCount: data[1][1],
        Distance: data[2][1]
      });
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  _toggleModal = () => this.setState({ isModalVisible: false });

  likeButtonHandle() {
    this.setState({ isLike: !this.state.isLike });
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fa6b7b", true);
      StatusBar.setTranslucent(true);
    }

    var dataContent = [
      {
        id: 1,
        cardBg: { uri: cardBgOne },
        profileImage: { uri: profileImgOne }
      },
      {
        id: 2,
        cardBg: { uri: cardBgTwo },
        profileImage: { uri: profileImgTwo }
      },
      {
        id: 3,
        cardBg: { uri: cardBgThree },
        profileImage: { uri: profileImgOne }
      }
    ];

    return (
      <Container style={styles.main}>
        <Header androidStatusBarColor={"#fa6b7b"} style={styles.header}>
          {/* Take up the space */}
          <Left style={styles.left}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-round-down" size={30} color="white" />
            </TouchableOpacity>
          </Left>

          {/* Title */}
          <Body style={styles.body}>
            <Title style={{ color: Colors.snow }}>Emma Roberts</Title>
          </Body>

          {/* Right Icon */}
          <Right style={styles.right}>
            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <SimpleLineIcons
                name="options-vertical"
                size={16}
                color="white"
              />
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={styles.swipeContainer}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={2.5}
            activeDot={<View />}
            dot={<View />}
          >
            {dataContent.map((item, index) => {
              return (
                <View style={styles.slideContainer} key={index}>
                  <Image source={item.cardBg} style={styles.imageContainer} />
                  <LinearGradient
                    locations={[0.5, 1]}
                    colors={["transparent", "black"]}
                    style={styles.shadowBg}
                  >
                    <View style={styles.swipeImageCountBg}>
                      <Image
                        source={Images.albumIcon}
                        style={styles.albumIcon}
                      />
                      <Text style={styles.galleryImgTxt}>{item.id}/3</Text>
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </Swiper>

          <View style={styles.profileDetailBg}>
            <Image
              source={{ uri: profileImgOne }}
              style={styles.profileImage}
            />
            <View style={{ flexDirection: "column", marginLeft: 20 }}>
              <Text style={styles.nameTxt}>{this.state.Name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Image source={Images.watchIcon} style={styles.watchIcon} />
                <Text style={styles.watchDistanceTxt}>
                  {this.state.WatchCount}
                </Text>
                <View style={styles.mapPin}>
                  <FontAwesome name="map-marker" size={18} color="white" />
                </View>
                <Text style={styles.watchDistanceTxt}>
                  {this.state.Distance}
                </Text>
              </View>
            </View>
            <Right style={styles.likeIcon}>
              {this.state.isLike == false ? (
                <SimpleLineIcons
                  name="heart"
                  size={30}
                  color="white"
                  onPress={() => this.likeButtonHandle()}
                />
              ) : (
                <FontAwesome
                  name="heart"
                  size={30}
                  color="#da3c47"
                  onPress={() => this.likeButtonHandle()}
                />
              )}
            </Right>
          </View>
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          style={styles.successMessage}
          swipeDirection="down"
          onBackdropPress={() => this._toggleModal()}
          onBackButtonPress={() => this._toggleModal()}
          onRequestClose={() => this._toggleModal()}
        >
          <View style={styles.mainModelSec}>
            <View>
              {this.state.Option.map((item, value) => {
                return (
                  <View style={styles.mainrendermodal}>
                    <TouchableOpacity onPress={() => this._toggleModal()}>
                      <Text style={styles.nameTxtmodal}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.horizontalborder} />
                  </View>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.maincanclebg}
            onPress={() => this._toggleModal()}
          >
            <Text style={styles.cancletext}>Cancle</Text>
          </TouchableOpacity>
        </Modal>
      </Container>
    );
  }
}
