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
  Title
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { Actions } from "react-native-router-flux";
// Screen Styles
import { Images, Metrics, Fonts, Colors } from "../../../resources/Themes";
import styles from "./styles";

const cardBgOne =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back01_s21_29.png";
const cardBgTwo =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back02_s21_29.png";
const cardBgThree =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back03_s21_29.png";
const cardBgFour =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back04_s21_29.png";
const cardBgFive =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back05_s21_29.png";
const cardBgSix =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_dis_back06_s21_29.png";
const profileImage =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_chat_propic02_21_29.png";

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      SimpleArray: [],
      datas: [
        {
          id: 0,
          name: "Emma Roberts0",
          cardBgImage: { uri: cardBgOne },
          profileImage: { uri: profileImage },
          WatchCount: 50,
          isLiked: true,
          index: 0
        },
        {
          id: 1,
          name: "Emma Roberts1",
          cardBgImage: { uri: cardBgTwo },
          profileImage: { uri: profileImage },
          WatchCount: 10,
          isLiked: true,
          index: 1
        },
        {
          id: 2,
          name: "Emma Roberts2",
          cardBgImage: { uri: cardBgThree },
          profileImage: { uri: profileImage },
          WatchCount: 90,
          isLiked: true,
          index: 2
        },
        {
          id: 3,
          name: "Emma Roberts3",
          cardBgImage: { uri: cardBgFour },
          profileImage: { uri: profileImage },
          WatchCount: 80,
          isLiked: true,
          index: 3
        },
        {
          id: 4,
          name: "Emma Roberts4",
          cardBgImage: { uri: cardBgFive },
          profileImage: { uri: profileImage },
          WatchCount: 58,
          isLiked: true,
          index: 4
        },
        {
          id: 5,
          name: "Emma Roberts5",
          cardBgImage: { uri: cardBgSix },
          profileImage: { uri: profileImage },
          WatchCount: 68,
          isLiked: true,
          index: 5
        },
        {
          id: 6,
          name: "Emma Roberts6",
          cardBgImage: { uri: cardBgOne },
          profileImage: { uri: profileImage },
          WatchCount: 50,
          isLiked: true,
          index: 6
        },
        {
          id: 7,
          name: "Emma Roberts7",
          cardBgImage: { uri: cardBgTwo },
          profileImage: { uri: profileImage },
          WatchCount: 10,
          isLiked: true,
          index: 7
        }
      ]
    };
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  _renderDeleteItem(index) {
    var newData = this.state.datas.slice(); //copy array
    newData.splice(index, 1); //remove element
    for (var i = 0; i < newData.length; i++) {
      newData[i].index = i;
    }
    this.setState({ datas: newData });
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fa6b7b", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        <Header androidStatusBarColor={"#fa6b7b"} style={styles.header}>
          {/* Take up the space */}
          <Left style={styles.left}>
            <TouchableOpacity onPress={Actions.pop}>
              {I18nManager.isRTL ? (
                <FontAwesome name="angle-right" size={30} color="white" />
              ) : (
                <FontAwesome name="angle-left" size={30} color="white" />
              )}
            </TouchableOpacity>
          </Left>

          {/* Title */}
          <Body style={styles.body}>
            <Title style={styles.headerTxt}>Favorite</Title>
          </Body>

          {/* Right Icon */}
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert("search clicked")}>
              <Ionicons name="ios-search" size={20} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={styles.Metrics}>
          <View style={styles.listContent}>
            {this.state.datas.map((item, index) => {
              return (
                <View style={styles.rowMain} key={index}>
                  <ImageBackground
                    source={item.cardBgImage}
                    style={styles.imgContainer}
                  >
                    <LinearGradient
                      locations={[0.7, 1]}
                      colors={["transparent", "black"]}
                      style={styles.shadowBg}
                    >
                      <View style={styles.bottomView}>
                        <Image
                          source={item.profileImage}
                          style={styles.profileImage}
                        />
                        <View style={styles.nameWatchBg}>
                          <Text style={styles.nameTxt}>{item.name}</Text>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={Images.watchIcon}
                              style={styles.watchIcon}
                            />
                            <Text style={styles.watchDistanceTxt}>
                              {item.WatchCount}
                            </Text>
                          </View>
                        </View>
                        <Right>
                          {item.isLiked == true ? (
                            <TouchableOpacity
                              onPress={() => this._renderDeleteItem(item.index)}
                              style={styles.likeIconBg}
                            >
                              <FontAwesome
                                name="heart"
                                size={20}
                                color="#da3c47"
                              />
                            </TouchableOpacity>
                          ) : (
                            <SimpleLineIcons
                              name="heart"
                              size={20}
                              color="white"
                            />
                          )}
                        </Right>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              );
            })}
          </View>
        </Content>
      </Container>
    );
  }
}
