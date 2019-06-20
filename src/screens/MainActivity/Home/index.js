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
import { CachedImage } from "react-native-cached-image";

import ListItemRekomendasi from './ListItemRekomendasi';

// Screen Styles
import styles from "./styles";

const cardBg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFnHJsE8uzmYtD2klBoevGCeZ9CnTN9GnzZt_4OCXLMUr5twmJAzVqgK5";
const cardBgOne = "https://i.imgur.com/6gs6CWz.png";
const cardBgTwo = "https://i.imgur.com/f4u4lSi.jpg";
const cardBgThree = "https://i.imgur.com/Wk274YA.jpg";
const profileImgOne = "https://i.imgur.com/7SHivJ1.png";
const profileImgTwo = "https://i.imgur.com/imGXHfy.png";

export default class Home extends Component {
  constructor(props) {
    super(props);
    const dataObjects = [
      {
        id: 1,
        name: "Gunung Gede",
        cardBg: { uri: cardBgOne },
        profileImage: { uri: profileImgOne },
        watch: "58",
        distance: "120m",
        place:"Cianjur, Jawa Barat-2958 mdpl"
      },
      {
        id: 2,
        name: "Gunung Gede",
        cardBg: { uri: cardBgTwo },
        profileImage: { uri: profileImgTwo },
        watch: "80",
        distance: "90km",
        place:"Cianjur, Jawa Barat-2958 mdpl"
      },
      {
        id: 3,
        name: "Gunung Gede",
        cardBg: { uri: cardBgThree },
        profileImage: { uri: profileImgOne },
        watch: "90",
        distance: "200m",
        place:"Cianjur, Jawa Barat-2958 mdpl"
      },
      {
        id: 4,
        name: "Gunung Gede",
        cardBg: { uri: cardBgOne },
        profileImage: { uri: profileImgTwo },
        watch: "10",
        distance: "5km",
        place:"Cianjur, Jawa Barat-2958 mdpl"
      },
      {
        id: 5,
        name: "Gunung Gede",
        cardBg: { uri: cardBgTwo },
        profileImage: { uri: profileImgOne },
        watch: "50",
        distance: "2km",
        place:"Cianjur, Jawa Barat-2958 mdpl"
      }
    ];
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({ rowHasChanged });

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows(dataObjects),
      selectedLots: [],
      new_collection: [
        {
          id: 1,
          image: { uri: cardBgOne },
          title: "NEW COLLECTION",
          description: "FOR SUMMER"
        },
        {
          id: 2,
          image: { uri: cardBgTwo },
          title: "NEW COLLECTION",
          description: "FOR SUMMER"
        },
        {
          id: 3,
          image: { uri: cardBgThree },
          title: "NEW COLLECTION",
          description: "FOR SUMMER"
        }
      ],
      dataList: ds.cloneWithRows([
        {
          id: 1,
          destinationimg: { uri: cardBgOne },
          destinationname: "Gunung Gede",
          place:"Cianjur, Jawa Barat"
        },
        {
          id: 2,
          destinationimg: { uri: cardBgTwo },
          destinationname: "Gunung Guntur",
          place:"Cianjur, Jawa Barat"
        },
        {
          id: 3,
          destinationimg: { uri: cardBgThree },
          destinationname: "Gunung Cikuray",
          place:"Cianjur, Jawa Barat"
        },
        {
          id: 4,
          destinationimg: { uri: cardBgOne },
          destinationname: "Gunung Manglayang",
          place:"Cianjur, Jawa Barat"
        }
      ])
    };
  }

  componentWillMount() {
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  // handleBackPress = () => {
  //   this.props.navigation.navigate("Login");
  //   return true;
  // };

  componentDidMount(){
    Api.get('questions/coba').then(resp =>{
        // alert(JSON.stringify(resp))
    });
  }

  // onLearnMore = (name, watch, distance) => {
  //   // this.props.navigation.navigate('NearByDetail');
  //   AsyncStorage.multiSet([
  //     ["Name", name],
  //     ["WatchCount", watch],
  //     ["Distance", distance]
  //   ]);
  //   Actions.tab1_2();
  // };

  // navigateFiltyerScreen = () => {
  //   Actions.tab_3_2();
  // };

  // navigatenearbyScreen = () => {
  //   Actions.tab_3_4();
  // };

  showDetail(){
    Actions.gunung_detail();
  }

  _renderRow(rowData) {
    return (      
      <ListItemRekomendasi
        rowData={rowData}
      />
    );
  }

  _renderList(rowData) {
    var that = this;

    return (
      <TouchableOpacity
        style={styles.listMainview}
        onPress={() =>
          this.showDetail()
        }
      >
        <CachedImage
          source={rowData.destinationimg}
          style={styles.destinationimg}
        >
          <TouchableOpacity />
        </CachedImage>
        <Text style={styles.destinationnamelist}>
          {rowData.destinationname}
        </Text>
        {/* <Text style={styles.mexicotext}>
          {rowData.destinationname}
        </Text> */}
        <View style={styles.placeDistanceBg}>
          <View style={styles.mapPin}>
            <FontAwesome name="map-marker" size={12} color="#b7b7b7" />
          </View>
          <Text style={styles.placeDistanceTxt}>{rowData.place}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }

    const { new_collection } = this.state;

    return (
      <Container style={styles.main}>
        {/* <LinearGradient
          locations={[0.1, 0.75]}
          colors={["#f87264", "#fa6982"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Header
            androidStatusBarColor={Colors.transparent}
            style={styles.header}
          >
            <Body style={styles.body}>
              <Title style={styles.titleTxt}>Nearby</Title>
            </Body>
            <Right style={styles.right}>
              <TouchableOpacity onPress={() => this.navigateFiltyerScreen()}>
                <Text style={styles.filterTxt}>Filter</Text>
              </TouchableOpacity>
            </Right>
          </Header>
        </LinearGradient> */}
        <StatusBar
     barStyle="light-content"
   />
        <Header style={styles.header}>
          <Left style={styles.left}>
            {/* <Image source={Images.ic_nikreuh} style={{height:50, width:50}} /> */}
            <Image
              style={{height: 40, width: 40}}
              // source={{uri: 'main_logo_orange'}} // Don't include file extension
              source={Images.ic_nikreuh}
            />
          </Left>
          <Body style={styles.body}>
            <View style={styles.searchView}>
              <Ionicons name="ios-search" size={18} color="transparent" />
            </View>

            <TextInput
              style={styles.searchText}
              placeholder="I'm looking for..."
              placeholderTextColor="#c3c3c3"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              selectionColor={"#6f6f6f"}
            />
          </Body>
          {/* <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert("User Group")}>
              <Image style={styles.userGroupIcon} source={Images.userGroup} />
            </TouchableOpacity>
          </Right> */}
        </Header>
        <Content>

          <View style={styles.slidesec}>
            <Swiper
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={2.5}
              activeDot={<View style={styles.activeDot} />}
              dot={<View style={styles.dot} />}
            >
              {new_collection.map((item, index) => {
                return (
                  <View style={styles.slide} key={index}>
                    <Image source={item.image} style={styles.sliderImage} />
                    <View style={styles.contentStyle}>
                      <Text style={styles.headertext}>{item.title}</Text>
                      <Text style={styles.desctext}>{item.description}</Text>
                    </View>
                  </View>
                );
              })}
            </Swiper>
          </View>

          <View style={styles.titleView}>
            <Text style={styles.titleText}>Rekomendasi Gunung</Text>
          </View>

          <ListView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            enableEmptySections
            scrollEnabled={true}
            />

          <View style={styles.titleView}>
            <Text style={styles.titleText}>List Gunung</Text>
          </View>

          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataList}
            renderRow={this._renderList.bind(this)}
            enableEmptySections
            pageSize={4}
          />

        </Content>
      </Container>
    );
  }
}
