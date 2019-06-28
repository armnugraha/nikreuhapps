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
    // data list gunung
    const dataObjects = [
      {
        id: 1,
        destinationName: "Gunung Gede",
        destinationImg: { uri: cardBgOne },
        watch: "58",
        distance: "120m",
        place:"Kab. Bogor, Jawa Barat, Indonesia",
        altitude:"2958 mdpl",
        desc:"Gunung Gede merupakan sebuah gunung yang berada di Pulau Jawa, Indonesia. Gunung Gede berada dalam ruang lingkup Taman Nasional Gede Pangrango, yang merupakan salah satu dari lima taman nasional yang pertama kali diumumkan di Indonesia pada tahun 1980."
      },
      {
        id: 2,
        destinationName: "Gunung Guntur",
        destinationImg: { uri: cardBgTwo },
        watch: "80",
        distance: "90km",
        place:"Garut Jawa Barat, Indonesia",
        altitude:"3019 mdpl",
        desc:"Gunung Pangrango merupakan gunung tertinggi kedua di Jawa Barat setelah Gunung Ceremai. Gunung Pangrango terletak persis bersebelahan dengan Gunung Gede dan berada dalam kawasan Taman Nasional Gede Pangrango."
      },
      {
        id: 3,
        destinationName: "Gunung Cikuray",
        destinationImg: { uri: cardBgThree },
        profileImage: { uri: profileImgOne },
        watch: "90",
        distance: "200m",
        place:"Garut, Jawa Barat, Indonesia",
        altitude:"2821 mdpl",
        desc:"Gunung Cikuray yang mempunyai ketinggian 2.821 meter di atas permukaan laut ini tidak mempunyai kawah aktif dan merupakan gunung tertinggi keempat di Jawa Barat setelah Gunung Ciremai, Gunung Pangrango dan Gunung Gede."
      },
      {
        id: 4,
        destinationName: "Gunung Gede",
        destinationImg: { uri: cardBgOne },
        profileImage: { uri: profileImgTwo },
        watch: "10",
        distance: "5km",
        place:"Cianjur, Jawa Barat",
        altitude:"2958 mdpl",
      },
      {
        id: 5,
        destinationName: "Gunung Gede",
        destinationImg: { uri: cardBgTwo },
        profileImage: { uri: profileImgOne },
        watch: "50",
        distance: "2km",
        place:"Cianjur, Jawa Barat-2958 mdpl",
        altitude:"2958 mdpl",
      }
    ];

    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({ rowHasChanged });

    this.state = {
      isLoading: true,
      isSearch:false,
      textSearch:"",
      titleListGunung: "List Gunung",
      dataSource: ds.cloneWithRows(dataObjects),
      selectedLots: [],
      new_collection: [
        {
          id: 1,
          image: { uri: cardBgOne },
          title: "",
          description: ""
        },
        {
          id: 2,
          image: { uri: cardBgTwo },
          title: "",
          description: ""
        },
        {
          id: 3,
          image: { uri: cardBgThree },
          title: "",
          description: ""
        }
      ],
      // data list rekomendasi
      dataList: ds.cloneWithRows([
        {
          id: 1,
          destinationImg: { uri: cardBgOne },
          destinationName: "Gunung Gede",
          place:"Cianjur, Jawa Barat",
          desc:"Gunung Gede merupakan sebuah gunung yang berada di Pulau Jawa, Indonesia. Gunung Gede berada dalam ruang lingkup Taman Nasional Gede Pangrango, yang merupakan salah satu dari lima taman nasional yang pertama kali diumumkan di Indonesia pada tahun 1980."
        },
        {
          id: 2,
          destinationImg: { uri: cardBgTwo },
          destinationName: "Gunung Guntur",
          place:"Cianjur, Jawa Barat",
          desc:"Gunung Pangrango merupakan gunung tertinggi kedua di Jawa Barat setelah Gunung Ceremai. Gunung Pangrango terletak persis bersebelahan dengan Gunung Gede dan berada dalam kawasan Taman Nasional Gede Pangrango."
        },
        {
          id: 3,
          destinationImg: { uri: cardBgThree },
          destinationName: "Gunung Cikuray",
          place:"Cianjur, Jawa Barat",
          desc:"Gunung Cikuray yang mempunyai ketinggian 2.821 meter di atas permukaan laut ini tidak mempunyai kawah aktif dan merupakan gunung tertinggi keempat di Jawa Barat setelah Gunung Ciremai, Gunung Pangrango dan Gunung Gede."
        },
        {
          id: 4,
          destinationImg: { uri: cardBgOne },
          destinationName: "Gunung Manglayang",
          place:"Cianjur, Jawa Barat",
          desc:''
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

  showDetail(data){
    Actions.gunung_detail({dataProps:data});
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
          this.showDetail(rowData)
        }
      >
        <CachedImage
          source={rowData.destinationImg}
          style={styles.destinationimg}
        >
          <TouchableOpacity />
        </CachedImage>
        <Text style={styles.destinationnamelist}>
          {rowData.destinationName}
        </Text>
        {/* <Text style={styles.mexicotext}>
          {rowData.destinationName}
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

  searchFilter(text){

    if(text == ""){
      this.setState({isSearch: false})
      this.setState({textSearch: null})
      this.setState({titleListGunung: "List Gunung"})
    }else{
      this.setState({isSearch: true})
      this.setState({textSearch: text})
      this.setState({titleListGunung: "Hasil Pencarian"})
    }

  }

  clearFilter(){
    this.setState({isSearch: false})
    this.setState({textSearch: null})
    this.setState({titleListGunung: "List Gunung"})
  }

  renderCloseSearch(){
    
    if(this.state.isSearch){
      return(
        <TouchableOpacity
          onPress={() => this.clearFilter() }>
          
          <View style={styles.closeView}>
            <Ionicons name="ios-close-circle-outline" size={18} color="#616161" />
          </View>
        </TouchableOpacity>
      );
    }else{
      return null;
    }
  }

  renderHeader(){
    const { new_collection } = this.state;
    if(!this.state.isSearch){
      return(
        <View>
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
        </View>
      );
    }else{
      return null;
    }
  }

  render() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

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

        <Header style={styles.header}>
          <Left style={styles.left}>
            {/* <Image source={Images.ic_nikreuh} style={{height:50, width:50}} /> */}
            <Image
              style={{height: 60, width: 60, justifyContent:'center', alignItems:'center', marginTop: 16}}
              // source={{uri: 'main_logo_orange'}} // Don't include file extension
              source={Images.main_logo_e}
            />
          </Left>
          <Body style={styles.body}>
            <View style={styles.searchView}>
              <Ionicons name="ios-search" size={18} color="#616161" />
            </View>

            <TextInput
              style={styles.searchText}
              placeholder="Search gunung..."
              placeholderTextColor="#616161"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              selectionColor={"#6f6f6f"}
              value={this.state.textSearch}
              onChangeText={text => this.searchFilter(text)}
            />

            {this.renderCloseSearch()}
            
          </Body>
          {/* <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert("User Group")}>
              <Image style={styles.userGroupIcon} source={Images.userGroup} />
            </TouchableOpacity>
          </Right> */}
        </Header>

        <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4"/>

        <Content>

          {/* Call function render slider with rekomended view */}

          {this.renderHeader()}

          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.state.titleListGunung}</Text>
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
