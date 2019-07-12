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
import { Content, Toast, Header, Left, Body, Right, Container, Form, Input, Item } from "native-base";
import { Fonts, Images } from "../../../resources/Themes";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Api from '../../../libs/Api';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

export default class PengelolaEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      phone: "",
      password: "",
      birthday: "",
      email: "",
      bio: "",
      ketinggian: "",
      location:"",
      price:"",
      deskripsi:"",
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
    Actions.pop()
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

            ToastAndroid.show('Selamat, anda telah berhasil di daftarkan. Selamat datang :)', ToastAndroid.SHORT)

            AsyncStorage.setItem('user_id', JSON.stringify(USERID));
            AsyncStorage.setItem('user_name', USERNAME);
            AsyncStorage.setItem('name', NAME);
            AsyncStorage.setItem('email', EMAIL);

            this.props.navigation.navigate("MainActivityScreen")

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
        
        <Header androidStatusBarColor={"#F4F4F4"} style={styles.header}>
          <Left style={{flex:0.75}}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <FontAwesome name="arrow-left" size={18} color="#616161" />
            </TouchableOpacity>
          </Left>
          <Body style={{flex:2}}>
            <Text>Edit</Text>
          </Body>
          <Right style={{flex:4}}>
          </Right>
        </Header>

        <StatusBar barStyle="dark-content" />

        {this.viewConnection()}

        <Content>
          <Form style={styles.form}>

            {/* Nama Gunung */}
            <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
              <FontAwesome name="user" size={18} color="#616161" />
              </View>

              <Input
                style={styles.searchTextFormInput}
                placeholder="Nama Gunung"
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType='next'
                keyboardType="default"
                selectionColor={"#6f6f6f"}
                value={this.state.textSearch}
                onSubmitEditing={() => this.refs.ketinggianInput._root.focus()} 
                onChangeText={(text) => {this.setState({name:text})}}
              />

            </View>
            
            {/* Ketinggian */}
            <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="user" size={18} color="#616161" />
              </View>

              <Input
                ref='ketinggianInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Ketinggian"
                placeholderTextColor="#616161"
                keyboardType='numeric'
                underlineColorAndroid="transparent"
                returnKeyType='next'
                autoCapitalize='none'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onSubmitEditing={() => this.refs.phoneInput._root.focus()} 
                onChangeText={(text) => {this.setState({ketinggian:text})}}
              />
            </View>

            {/* Phone */}
            <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="phone" size={18} color="#616161" />
              </View>

              <Input
                ref='phoneInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Phone"
                keyboardType='numeric'
                maxLength={13}
                autoCapitalize='none'
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                returnKeyType='next'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onSubmitEditing={() => this.refs.lokasiInput._root.focus()}
                onChangeText={(text) => {this.setState({phone:text})}}
              />
            </View>

            {/* Email */}
            {/* <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="envelope" size={18} color="#616161" />
              </View>

              <Input
                ref='emailInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                keyboardType='email-address' 
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                returnKeyType='next'
                autoCapitalize='none'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onSubmitEditing={() => this.refs.bioInput._root.focus()}
                onChangeText={(text) => {this.setState({email:text})}}
              />
            </View> */}

            {/* Lokasi */}
            <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="map-marker" size={18} color="#616161" />
              </View>

              <Input
                ref='lokasiInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Lokasi"
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                returnKeyType='next'
                autoCapitalize='none'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onSubmitEditing={() => this.refs.hargaInput._root.focus()}
                onChangeText={(text) => {this.setState({location:text})}}
              />
            </View>

            {/* Harga */}
            <View style={styles.bodyFormInput}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="tags" size={18} color="#616161" />
              </View>

              <Input
                ref='hargaInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Harga"
                keyboardType='numeric'
                maxLength={13}
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                returnKeyType='next'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onSubmitEditing={() => this.refs.deskripsiInput._root.focus()}
                onChangeText={(text) => {this.setState({price:text})}}
              />
            </View>

            {/* Deskripsi */}
            <View style={styles.bodyFormInputArea}>
              <View style={styles.searchViewFormInput}>
                <FontAwesome name="envelope" size={18} color="#616161" />
              </View>

              <Input
                ref='deskripsiInput'
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Deskripsi"
                placeholderTextColor="#616161"
                underlineColorAndroid="transparent"
                returnKeyType='next'
                multiline
                autoCapitalize='none'
                selectionColor={"#6f6f6f"}
                style={styles.searchTextFormInput}
                onChangeText={(text) => {this.setState({deskripsi:text})}}
              />
            </View>
            
            {this.loadingView()}

            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={() => this.signUp(this.state.username, this.state.name, this.state.email, this.state.password)}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Save
              </Text>
            </TouchableOpacity>
          </Form>
          
        </Content>

      </Container>
    );
  }
}