import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  AsyncStorage,
  Alert
} from "react-native";
import { Container } from "native-base";

import {
  Scene,
  Router,
  Actions,
  Reducer,
  Overlay,
  Tabs,
  Stack,
  Lightbox
} from "react-native-router-flux";

import TabIcon from "./TabIcon";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Signin from '../BaseActivity/Signin/index';

import Home from "./Home/index";
import NearByDetails from "./NearByDetails/index";
import Favorite from "./Favorite/index";
import Filter from "./Filter/index";
import Profile from "./Profile/index";

import GunungDetails from "./GunungDetails/index";
import DetailImage from "./GunungDetails/DetailImage";
import Kosong from "./kosong";
import SignUpScreen from "../BaseActivity/SignUp";
import ProfileEditScreen from "./ProfileEdit";
import AdminScreen from "./index_admin";
import TrackingModes from "./maps";
import RecordModes from "./MapRecords";
import NavigationScreen from "./Navigations";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarStyle: {
    backgroundColor: "#F4F4F4"
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd"
  }
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: "#F5FCFF",
  shadowOpacity: 1,
  shadowRadius: 3
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const onBackPress = () => {
  if (Actions.state.index !== 0) {
    return false;
  }
  Alert.alert(
    'Exit App',
    'Exiting the application?', [{
        text: 'Cancel',
        style: 'cancel'
    }, {
        text: 'OK',
        onPress:()=> BackHandler.exitApp(),
    }, ], {
        cancelable: false
    }
  )
  return true;
  // Actions.pop();
  // return true;
};

export default class Example extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Login");
    return true;
  };

  constructor(props) {
    super(props);

    this.state = {
      title: "Nearby"
    };
  }
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }
    
    return (
      <Container>
        <StatusBar barStyle="light-content" />

        {/* <TouchableOpacity
          style={{
            position: "absolute",
            top: Metrics.HEIGHT * 0.042,
            left: 30,
            zIndex: 1111111
          }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <FontAwesome name="home" size={30} color="white" />
        </TouchableOpacity> */}

        <Router
          createReducer={reducerCreate}
          getSceneStyle={getSceneStyle}
          uriPrefix={prefix}
          backAndroidHandler={onBackPress}
        >
          <Overlay key="overlay">
            <Lightbox key="lightbox">
              <Stack hideNavBar key="root" titleStyle={{ alignSelf: "center" }}>
                
                <Scene key="MainActivityScreen" component={Example} hideNavBar />
                <Scene key="AdminMainActivity" component={AdminScreen} hideNavBar />

                <Scene key="SigninScreen" component={Signin} hideNavBar />
                <Scene key="SignUpScreen" component={SignUpScreen} hideNavBar />

                <Scene key="gunung_detail" component={GunungDetails} hideNavBar />
                <Scene key="gunung_detail_image" component={DetailImage} hideNavBar />
                <Scene key="profile" component={Profile} />
                <Scene key="profile_edit" component={ProfileEditScreen} hideNavBar/>

                <Scene key="tab_3_2" component={Filter} hideNavBar />
                <Scene key="kos" component={Kosong} hideNavBar />
                
                <Scene key="maps" component={TrackingModes} hideNavBar />
                <Scene key="maps_record" component={RecordModes} hideNavBar />

                {/* <Scene key="tab_3_3" component={DiscoveryDetails} hideNavBar /> */}

                <Scene hideNavBar initial panHandlers={null} key="mainTab">
                  <Tabs
                    key="tabbar"
                    swipeEnabled={false}
                    showLabel={false}
                    tabBarStyle={styles.tabBarStyle}
                    activeBackgroundColor="white"
                    inactiveBackgroundColor="white"
                    tabBarPosition={"bottom"}
                  >
                    <Stack
                      key="tab_1"
                      title="Home"
                      tabBarLabel="TAB #1"
                      inactiveBackgroundColor="#F4F4F4"
                      activeBackgroundColor="#F4F4F4"
                      icon={TabIcon}
                      titleStyle={{ color: "green", alignSelf: "center" }}
                      initial
                    >
                      <Scene
                        key="tab1_1"
                        component={Home}
                        onRight={() => alert("Right button")}
                        rightTitle="Right"
                        hideNavBar
                      />

                      <Scene
                        key="tab1_2"
                        component={NearByDetails}
                        hideNavBar
                        titleStyle={{ color: "black", alignSelf: "center" }}
                      />
                    </Stack>

                    {/* <Stack key="tab_2" title="Message" icon={TabIcon}>
                      <Scene key="tab_2_1" component={Message} hideNavBar />
                    </Stack>

                    <Stack key="tab_3" title="Discovery" icon={TabIcon}>
                      <Scene
                        key="tab_3_1"
                        component={Discovery}
                        title="Discovery"
                        icon={TabIcon}
                        hideNavBar
                      />
                    </Stack> */}
                    <Stack key="tab_4" title="Navigation" icon={TabIcon}>
                      <Scene
                        key="tab_4_1"
                        component={NavigationScreen}
                        title="Favorite"
                        hideNavBar
                        icon={TabIcon}
                      />
                    </Stack>
                    <Stack key="tab_5" title="Profile" icon={TabIcon}>
                      <Scene
                        key="tab_5_1"
                        component={Profile}
                        title="Profile"
                        icon={TabIcon}
                        hideNavBar
                      />
                    </Stack>
                  </Tabs>
                </Scene>
              </Stack>
            </Lightbox>
          </Overlay>
        </Router>
      </Container>
    );
  }
}