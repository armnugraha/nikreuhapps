import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  ImageBackground,
  AsyncStorage,
  NetInfo,
  ScrollView,
  BackHandler,
  I18nManager,
  ToastAndroid
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Spinner,
  Form,
  Item,
  Input,
  Content,
} from "native-base";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Images } from "../../../resources/Themes";

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ActionToSignin: "SigninScreen",
      ActionToSignup: "SignUpScreen",
      usernameText:'',
      emailText:'',
      passwordText:'',
      getDataWalkThroug:null,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    
    this.splashScreen()

    const { state } = this.props.navigation;
    
    if(this.props.navigation.state.params){
      this.setState({getDataWalkThroug:state.params.setFromIntro})
    }

  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  componentDidMount(){
        
    AsyncStorage.getItem('user_id').then((token) => {         

      if(token != null){
        USERID = token
      }

      if(USERID != null){
        this.props.navigation.navigate("MainActivityScreen")
      }

    })
      
  }

  backPressed = () => {
    return BackHandler.exitApp();
  };

  login(email, password){

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email != "" && password != "") {

      if (email.match(mailformat)) {
        this.props.navigation.navigate("MainActivityScreen")

        let USERID = 1;
        let USERNAME = "Arman";
        let EMAIL = this.state.emailText;
        AsyncStorage.setItem('user_id', JSON.stringify(USERID));
        AsyncStorage.setItem('user_name', USERNAME);
        AsyncStorage.setItem('email', EMAIL);

      } else {
        ToastAndroid.show('Inputan email tidak valid', ToastAndroid.SHORT)
        // Toast.show({
        //   text: "Please enter valid email.",
        //   duration:2000,
        //   type: "danger"
        // });
      }

    } else {
      if (email == "" || password == '') {
        ToastAndroid.show('Inputan tidak boleh kosong', ToastAndroid.SHORT)
        return;
      }
    }

  }

  splashScreen(){
    setTimeout(() => {
      this.setState({isLoading:true})
		}, 4000)
	}

  render() {

    const { state } = this.props.navigation;
    
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

    // SplashScreen

    // if(!this.state.isLoading && this.state.getDataWalkThroug != "true"){
    //   return (
		// 		<View style={{flex: 1,flexDirection: "row",alignItems: "stretch"}}>
		// 			<Image
    //         style={{
    //           flex: 1,width: null,height: null,resizeMode:"contain"
    //         }}
    //         source={Images.main_logo}
    //       />
		// 		</View>
		// 	)
		// }

    let BG_Image = {
      uri:
        "https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_four.jpg"
    };

    return (
      <Container style={styles.bgBody}>
        <StatusBar barStyle="light-content" />
        
        <Content>
          <View style={styles.logosec}>
            <Image source={Images.main_logo} style={styles.logostyle} />
          </View>
          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                returnKeyType='next'
                keyboardType='email-address' 
								autoCapitalize='none'
                onSubmitEditing={() => this.refs.passwordInput._root.focus()} 
                style={styles.inputmain}
                onChangeText={(text) => {this.setState({emailText:text})}}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                placeholder="Password"
                ref='passwordInput'
								autoCapitalize='none'
                secureTextEntry={true}
                textAlign={I18nManager.isRTL ? "right" : "left"}
                onChangeText={(text) => this.setState({passwordText:text})}
                style={styles.inputmain}
                onSubmitEditing={() => this.login(this.state.emailText, this.state.passwordText)}
              />
            </Item>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={() => this.login(this.state.emailText, this.state.passwordText)}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Form>
          <View iconRight style={styles.fbview}>
            <Text autoCapitalize="words" style={styles.sgText}>
              Don&apos;t have an account?
            </Text>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.sgButton}
              onPress={() => this.props.navigation.navigate(this.state.ActionToSignup)}
            >
              <View style={styles.sgview}>
                <Text autoCapitalize="words" style={styles.sgButtonText}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>

      </Container>
    );
  }
}