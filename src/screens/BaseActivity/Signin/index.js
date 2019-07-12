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
  ActivityIndicator,
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
import Api from '../../../libs/Api';
import base64 from 'react-native-base64'

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ActionToSignin: "SigninScreen",
      ActionToSignup: "SignUpScreen",
      usernameText:'arman',
      emailText:'1234',
      passwordText:'',
      getDataWalkThroug:null,
      isConnected: true,
      loading: false,
      statusButton: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
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

    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({statusButton: true})
      this.setState({ isConnected });
    }
  };

  backPressed = () => {
    return BackHandler.exitApp();
  };

  login(username, password){

    if (!this.state.isConnected) {

      ToastAndroid.show('Harap periksa koneksi terlebih dahulu', ToastAndroid.SHORT)

    }else{

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (username != "" && password != "") {

        // if (email.match(mailformat)) {

          this.setState({loading: true})
          this.setState({statusButton: true})

          let params = {
            username: username,
            password: password,
          };
      
          Api.post('/auth', params).then(resp =>{

            if(resp.status == "ok"){

              let getDataToken = resp.data.long;
              let splitToken = getDataToken.split(".",2);

              let decodeToken = base64.decode(splitToken[1])
              let splitDataToken = decodeToken.split(":",4);

              let getSplitId = splitDataToken[1];
              let splitDataId = getSplitId.split(",",1);

              let getSplitEmail = splitDataToken[2];
              let splitDataEmail = getSplitEmail.split(",",1);

              // let getSplitUsername = splitDataToken[3];
              // let splitDataUsername = getSplitUsername.split(",",1);
              
              if(username == "asep"){
                this.props.navigation.navigate("AdminMainActivity")
                AsyncStorage.setItem('pengelola', "TRUE");
                
              }else{
                this.props.navigation.navigate("MainActivityScreen")
              }
              
              ToastAndroid.show('Selamat datang :)', ToastAndroid.SHORT)

              USERID = splitDataId;
              USERNAME = username;

              AsyncStorage.setItem('user_id', "'" + splitDataId + "'");
              AsyncStorage.setItem('user_name', username);
              AsyncStorage.setItem('email', JSON.stringify(splitDataEmail));

            }else{
              ToastAndroid.show("Maaf login anda gagal!", ToastAndroid.SHORT)
              this.setState({statusButton: false})
              this.setState({loading: false})
            }

          })
          .catch(error => {
            ToastAndroid.show("Maaf username atau password salah!", ToastAndroid.SHORT)
            this.setState({statusButton: false})
            this.setState({loading: false})
            // ToastAndroid.show("'"+ error +"'", ToastAndroid.SHORT)
          });

        // } else {
        //   ToastAndroid.show('Inputan email tidak valid', ToastAndroid.SHORT)
        //   // Toast.show({
        //   //   text: "Please enter valid email.",
        //   //   duration:2000,
        //   //   type: "danger"
        //   // });
        // }

      } else {
        
        if (username == "" || password == '') {
          ToastAndroid.show('Inputan tidak boleh kosong', ToastAndroid.SHORT)
          return;
        }

      }

    }

  }

  splashScreen(){
    setTimeout(() => {
      this.setState({isLoading:true})
		}, 4000)
  }
  
  viewConnection(){

    if (!this.state.isConnected) {
      return(
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )
    }

  }

  loadingView(){
    if(this.state.loading){
      return(
        <ActivityIndicator />
      )
    }
  }

  render() {

    const { state } = this.props.navigation;
    
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

    let BG_Image = {
      uri:
        "https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_four.jpg"
    };

    return (
      <Container style={styles.bgBody}>
        <StatusBar barStyle="dark-content" />

        
        {this.viewConnection()}

        <Content>
        
          <View style={styles.logosec}>
            <Image source={Images.main_logo_transparent} style={styles.logostyle} />
          </View>

          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Username"
                returnKeyType='next'
                // keyboardType='email-address'
								autoCapitalize='none'
                onSubmitEditing={() => this.refs.passwordInput._root.focus()} 
                style={styles.inputmain}
                onChangeText={(text) => {this.setState({usernameText:text})}}
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
                onSubmitEditing={() => this.login(this.state.usernameText, this.state.passwordText)}
              />
            </Item>

            {this.loadingView()}

            <TouchableOpacity
              info
              style={styles.signInbtn}
              disabled={this.state.statusButton}
              onPress={() => this.login(this.state.usernameText, this.state.passwordText)}
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
              disabled={this.state.statusButton}
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