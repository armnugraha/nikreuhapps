import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  I18nManager,
  ActivityIndicator,
  TouchableOpacity,
  NetInfo,
  BackHandler,
  Image,
  ToastAndroid
} from "react-native";
import { Content, Toast, Container, Form, Input, Item } from "native-base";
import { Fonts, Images } from "../../../resources/Themes";
import styles from "./style";

import Api from '../../../libs/Api';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      password: "",
      birthday: "",
      email: "",
      gender: "Female",
      ActionToSignin: "SigninScreen",
      ActionToSignup: "SignUpScreen",
      isConnected: true,
      loading: false,
      statusButton: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
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
    this.props.navigation.navigate(this.state.ActionToSignin);
    return true;
  };

  onChangeText = gender => {
    if (gender == 0) {
      this.setState({ gender: "Female" });
    }
    if (gender == 1) {
      this.setState({ gender: "Male" });
    }
  };

  signUp(username, name, email, password){

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (username != "" && name != "" && email != "" && password != "") {

      if (email.match(mailformat)) {

        this.setState({loading: true})

        let params = {
          username: username,
          name: name,
          bio: "",
          phone: "",
          email:email,
          password: password,
        };

        
        Api.post('/auth/register', params).then(resp =>{
          
          if(resp.status == "ok"){
            
            let USERID = 1;
            let USERNAME = username;
            let NAME = name;
            let EMAIL = email;

            ToastAndroid.show('Selamat, anda telah berhasil di daftarkan. Silahkan login terlebih dahulu :)', ToastAndroid.SHORT)

            // AsyncStorage.setItem('user_id', JSON.stringify(USERID));
            // AsyncStorage.setItem('user_name', USERNAME);
            // AsyncStorage.setItem('name', NAME);
            // AsyncStorage.setItem('email', EMAIL);

            this.props.navigation.navigate(this.state.ActionToSignin)

          }else{
            this.setState({statusButton: false})
            ToastAndroid.show("Maaf register anda gagal!", ToastAndroid.SHORT)
            this.setState({loading: false})
          }

        })
        .catch(error => {
          this.setState({statusButton: false})
          ToastAndroid.show("'"+ error +"'", ToastAndroid.SHORT)  
        });

      } else {
        ToastAndroid.show('Inputan email tidak valid', ToastAndroid.SHORT)
        // Toast.show({
        //   text: "Please enter valid email.",
        //   duration:2000,
        //   type: "danger"
        // });
      }

    } else {
      if (username == "" || name == "" || email == "" || password == '') {
        ToastAndroid.show('Inputan tidak boleh kosong', ToastAndroid.SHORT)
        return;
      }
    }

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
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F4F4F4", true);
      StatusBar.setTranslucent(true);
    }

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
								autoCapitalize='none'
                onSubmitEditing={() => this.refs.nameInput._root.focus()} 
                style={styles.inputmain}
                onChangeText={(text) => {this.setState({username:text})}}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                ref='nameInput'
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Name"
                returnKeyType='next'
								autoCapitalize='none'
                onSubmitEditing={() => this.refs.emailInput._root.focus()} 
                style={styles.inputmain}
                onChangeText={(text) => {this.setState({name:text})}}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                ref='emailInput'
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                returnKeyType='next'
                keyboardType='email-address' 
								autoCapitalize='none'
                onSubmitEditing={() => this.refs.passwordInput._root.focus()} 
                style={styles.inputmain}
                onChangeText={(text) => {this.setState({email:text})}}
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
                onChangeText={(text) => this.setState({password:text})}
                style={styles.inputmain}
                onSubmitEditing={() => this.signUp(this.state.username, this.state.name, this.state.email, this.state.password)}
              />
            </Item>

            {this.loadingView()}

            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={() => this.signUp(this.state.username, this.state.name, this.state.email, this.state.password)}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Form>
          <View iconRight style={styles.fbview}>
            <Text autoCapitalize="words" style={styles.sgText}>
              Have already account?
            </Text>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.sgButton}
              onPress={() => this.props.navigation.navigate(this.state.ActionToSignin)}
            >
              <View style={styles.sgview}>
                <Text autoCapitalize="words" style={styles.sgButtonText}>
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>

      </Container>
      // {/* <TouchableOpacity
      //       style={{flexDirection: "row",width: Metrics.WIDTH * 0.8,justifyContent: "space-between"}}
      //       onPress={() => this.refs.datepicker.onPressDate()}>
      //       <TextInput
      //         editable={false}
      //         ref="date"
      //         style={[
      //           styles.infoText,
      //           {width: Metrics.WIDTH * 0.7,
      //             ...Platform.select({
      //               ios: { marginTop: 20 },
      //               android: { marginTop: 8 }
      //             })
      //           }
      //         ]}
      //         maxLength={15}
      //         placeholder="Birthday"
      //         placeholderTextColor="#929292"
      //         underlineColorAndroid="transparent"
      //         autoCapitalize="none"
      //         keyboardType="default"
      //         textAlign={I18nManager.isRTL ? "right" : "left"}
      //         value={this.state.birthday}
      //       />

      //       <EvilIcons
      //         name="calendar"
      //         size={25}
      //         color="#da3c47"
      //         style={{ marginTop: 20 }}
      //       />
      //     </TouchableOpacity>

      //   <DatePicker
      //     ref="datepicker"
      //     style={{ width: 0, height: 0 }}
      //     customStyles={{
      //       dateIcon: {
      //         width: 0,
      //         height: 0
      //       },
      //       dateInput: {
      //         borderWidth: 0
      //       }
      //     }}
      //     date={this.state.birthday}
      //     mode="date"
      //     format="YYYY-MM-DD"
      //     maxDate={new Date()}
      //     hideText={true}
      //     confirmBtnText="Confirm"
      //     cancelBtnText="Cancel"
      //     onDateChange={birthday => {
      //       this.setState({ birthday: birthday });
      //     }}
      //   />

      //   <View style={styles.divider} />

      //   <View
      //     style={{
      //       flexDirection: "row",
      //       justifyContent: "space-between",
      //       width: Metrics.WIDTH * 0.8
      //     }}
      //   >
      //     <ModalDropdown
      //       options={["Female", "Male"]}
      //       defaultValue="Female"
      //       onSelect={this.onChangeText}
      //       style={styles.mainstyle}
      //       dropdownStyle={styles.dropdownstyle}
      //       dropdownTextStyle={styles.dropdownTextStyle}
      //       textStyle={styles.textStyle}
      //     />

      //     <Entypo
      //       name="chevron-small-down"
      //       size={25}
      //       color="#da3c47"
      //       style={{ marginTop: 25 }}
      //     />
      //   </View>

      //   <View style={styles.genderDivider} /> */}
    );
  }
}
