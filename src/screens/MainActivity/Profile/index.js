import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  BackHandler,
  AsyncStorage,
  FlatList
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
  Title,
  Picker
} from "native-base";
import ReadMore from "react-native-read-more-text";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Images, Metrics, Fonts, Colors } from "../../../resources/Themes";
// Screen Styles
import styles from "./styles";
import images from "../../../resources/Themes/Images";
import ListItemData from './ListItemData';

import { withNavigation } from 'react-navigation';

const bgImage =
  "https://antiqueruby.aliansoftware.net//Images/profile/image_bg_profile_nine.jpg";
const profileImg =
  "https://antiqueruby.aliansoftware.net//Images/profile/card_propic_18_02.png";
const profileImageTwo =
  "https://antiqueruby.aliansoftware.net//Images/profile/card_propic_02_p11.png";
const profileImageThree =
  "https://antiqueruby.aliansoftware.net//Images/profile/ic_suggested_user_two_profile_nine.png";

class Profile extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle: { borderBottomColor:'transparent',borderBottomWidth: 0, shadowColor: 'transparent' },
  })

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selected: "key1",
      dataListSource: [
        {
          id: 1,
          img: { uri: "https://imgur.com/7SHivJ1.png" }
        },
        {
          id: 2,
          img: { uri: "https://imgur.com/MIaJxsG.png" }
        },
        {
          id: 3,
          img: { uri: "https://imgur.com/0ZW96Pe.png" }
        },
        {
          id: 4,
          img: { uri: "https://imgur.com/EXnY0Gr.png" }
        }
      ],
      getUsername:"",
      getBio:"",
    };
  }

  _renderProfileImageRow(rowData) {

    // alert(rowData)
    return (
      <View>
        <Image
          style={
            rowData.id == "1"
              ? styles.suggestedPeopleImg
              : styles.suggestedPeopleImgOther
          }
          source={rowData.profileImage}
        />
      </View>
    );
  }

  _renderProfileDetailRow(rowData) {
    return (
      <View style={styles.mainviewrow}>
        <Image source={rowData.profileImage} style={styles.mainimgrow} />
        <View style={styles.row}>
          <View style={styles.details}>
            <Text style={styles.name}>{rowData.name}</Text>
            <Text style={styles.status}>{rowData.status}</Text>
          </View>
          {rowData.isTimeStatusOn == "true" ? (
            <View style={styles.details}>
              <Ionicons name="md-time" size={15} color="#b7b7b7" />
              <Text style={styles.time}>{rowData.timeStatus}</Text>
            </View>
          ) : (
            <Text style={styles.descrow}>{rowData.description}</Text>
          )}
        </View>
      </View>
    );
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Profile");
      return true;
    });

    this.setState({getUsername: USERNAME})
    this.setState({getBio: "mulih kajati mulang ka asal"})

  }

  onValueChange(value) {
    if(value == "logout"){
      this.props.navigation.navigate("SigninScreen")
      AsyncStorage.removeItem('user_id')
			AsyncStorage.removeItem('user_name')
			AsyncStorage.removeItem('email')
			AsyncStorage.removeItem('pengelola')
    }else{
      this.props.navigation.navigate("profile_edit", {callReloadData:this.callReloadData})
    }
  }

  //CALLBACK FOR ANOTHER COMPONENT USE THIS METHOD
	callReloadData = (usernameUpdate, bioUpdate) =>{
    const { store } = this.props;
    this.setState({getUsername: usernameUpdate})
    this.setState({getBio: bioUpdate})
	}

  render() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        {/* <Image source={{ uri: bgImage }} style={styles.imgContainer} />
        <Header androidStatusBarColor={"transparent"} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </Left>

          <Body style={styles.body}>
            <Title style={styles.title}>Profiles</Title>
          </Body>

          <Right style={styles.left}>
            <Button transparent />
          </Right>
        </Header> */}

        <StatusBar setBackgroundColor="#F4F4F4" barStyle="dark-content" />

        <Content>
          <View>
            <ImageBackground source={images.main_bg_profil} style={styles.imgHeader}>
        
              {/* <View style={styles.morePicker}> */}
              <Header androidStatusBarColor={"#F4F4F4"} style={styles.header}>
              <StatusBar setBackgroundColor="#F4F4F4" barStyle="dark-content" />
                  <Left style={styles.left}>
                    
                  </Left>
                  <Body style={styles.body}>
                    {/* <Text style={styles.textTitle}>Johnie Cornwall</Text> */}
                  </Body>
                  <Right style={{flex: 0.4}}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<FontAwesome name="ellipsis-v" size={25} color='white'/>}
                      style={{ width: undefined }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="~Select~" value="" />
                      <Picker.Item label="Edit Profile" value="edit" />
                      <Picker.Item label="Logout" value="logout" />
                    </Picker>
                  </Right>
              </Header>
              {/* </View> */}
              <Image source={{ uri: profileImg }} style={styles.profileImgHeader} />

              <Text style={styles.textName}>
                {this.state.getUsername}
              </Text>
              <Text style={styles.textMotiv}>
                {this.state.getBio}
              </Text>

            </ImageBackground>
          </View>

          <FlatList
            data={this.state.dataListSource}
            numColumns={2}
            style={styles.listContent}
            renderItem = {({item, index}) => (
                <ListItemData
                  {...item}
                />
              )            
            }

            keyExtractor = {(item, index) => index.toString()}
          />
          
        </Content>
      </Container>
    );
  }
  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View less
      </Text>
    );
  };
}


export default withNavigation(Profile);