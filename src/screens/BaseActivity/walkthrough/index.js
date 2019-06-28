import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  BackHandler,
  AsyncStorage
} from "react-native";
import { Metrics, Images } from "../../../resources/Themes";
import Swiper from "react-native-swiper";
import styles from "./style";

const swiperData = [
  {
    id: 1,
    description:"Selamat Datang \n Terimakasih telah menggunakan aplikasi kami",
    image: { uri: 'https://i.imgur.com/lOiZxaX.png' }
  },
  {
    id: 2,
    description:"Sibuk Kerja, Kuliah, maupun tugas numpuk ?",
    image: { uri: 'https://i.imgur.com/lwZiGxd.png' }
  },
  {
    id: 3,
    description:"Rencanakan liburan anda dengan lebih mudah",
    image: { uri: 'https://i.imgur.com/p3zHWCv.png' }
  },
  {
    id: 4,
    description:"NikreuhApp membantu solusi perjalanan anda",
    image: { uri: 'https://i.imgur.com/LLEkMUd.png' }
  },
  {
    id: 5,
    description:"Selamat bersenang - senang",
    image: { uri: 'https://i.imgur.com/fVaTMKn.png' }
  }
];

export default class IntroductionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    return BackHandler.exitApp();
  };

  goToSignin(){
    this.props.navigation.navigate("SigninScreen", {setFromIntro: "true"})
    AsyncStorage.setItem('has_walk_through', "TRUE");
  }

  render() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <View style={styles.main}>
        <View
          style={{
            width: Metrics.WIDTH,
            height: Metrics.HEIGHT * 0.89
          }}
        >
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={2.5}
            activeDot={<View style={styles.activeDot} />}
            dot={<View style={styles.dot} />}
          >
            {swiperData.map((item, index) => {
              return (
                <View style={styles.slide} key={index}>
                  <Image
                    style={{
                      width: Metrics.WIDTH * 0.50,
                      height: Metrics.WIDTH * 0.50
                    }}
                    source={item.image}
                  />
                  <Text style={styles.desctext}>{item.description}</Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.getStartedBtnBg}
            onPress={() => this.goToSignin()}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
