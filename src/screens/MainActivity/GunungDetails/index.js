import React, { Component } from 'react';
import { Text, View, Image, StatusBar, Platform, ImageBackground,Dimensions,TouchableOpacity, ListView, ScrollView, BackHandler, I18nManager, Modal, Linking, NetInfo,ToastAndroid} from 'react-native';
import { Container, Button, Icon, Right, Item, Input, Header, Footer, FooterTab, Left, Body, Title, Content, Form, Label, Picker} from 'native-base';
// Screen Styles
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Colors, Fonts, Metrics } from '../../../resources/Themes';
import Stars from 'react-native-stars';
import { Actions } from "react-native-router-flux";
import ImageViewer from 'react-native-image-zoom-viewer';

const headerBG = 'https://i.imgur.com/6gs6CWz.png';
const firiendProOne = 'https://antiqueruby.aliansoftware.net//Images/profile/card_propic_18.png';
const firiendProTwo = 'https://antiqueruby.aliansoftware.net//Images/profile/card_propic_18_02.png';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class ProfileNewsFeedThree extends Component {

  componentWillMount() {
    var that = this
    BackHandler.addEventListener('hardwareBackPress', function() {
      Actions.pop()
      return true;
    });
  }

  constructor(props) {
 		super(props);

 		this.state = {
      renderHeader: false,
		  renderList: false,
      renderFooter: false,
      modalVisible: false,
      isConnected: true,
      selected: "key1"
    };
  }

  componentDidMount() {
		setTimeout(() => {this.setState({renderHeader: true})}, 0);
		setTimeout(() => {this.setState({renderList: true})}, 0);
    setTimeout(() => {this.setState({renderFooter: true})}, 0);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  showImage(index) {
    // Actions.gunung_detail_image();
    this.setState({
			modalVisible: true,
			index: index,
    })
    StatusBar.setHidden(true);
  }

  modalClose(){
    StatusBar.setHidden(false);
    this.setState({ modalVisible: false })
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

  onValueChange() {
    this.setState({
      selected: value
    });
  }

  goToWA(){

    if (this.state.isConnected) {
      Linking.openURL('whatsapp://send?text=hello&phone=+6287822516625')
    }else{
      ToastAndroid.show('Harap periksa koneksi terlebih dahulu', ToastAndroid.SHORT)
    }

  }

  render(){
		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
    }
    
    const {renderHeader,renderList,renderFooter} = this.state;

    var {dataProps} = this.props

    var that = this;

    var data = [
      {
        id: 1,
        image: 'https://i.imgur.com/6gs6CWz.png',
        notifications: 3,
        color: '#f7a235'
      },
      {
        id: 2,
        image: 'https://i.imgur.com/f4u4lSi.jpg',
        notifications: 11,
        color: '#76cf25'
      },
      {
        id: 3,
        image: 'https://i.imgur.com/Wk274YA.jpg',
        notifications: 52,
        color: '#ed1c24'
      },
    ]

    const images = [];

		for(let i = 0; i < data.length; i++){
			images.push({
				url: data[i].image,
				width: 300,
				height: 300
			})
    }

    var dataFriends = [
      {
        id: 1,
        name: 'Agus',
        profile: firiendProOne,
        notification: 'followed you',
        comment: 'Jalur nya cukup baik',
        time: 'Just now',
      },
      {
        id: 2,
        name: 'Ujang',
        profile: firiendProTwo,
        notification: 'commented your post',
        comment: 'Pemandangan nya bagus',
        time: '25 mins ago',
      },
      {
        id: 3,
        name: 'Asep',
        profile: firiendProOne,
        notification: 'liked your post',
        comment: 'Cocok untuk bagi para pecinta alam',
        time: '45 mins ago',
      },
    ]

    return(
     <Container style={styles.main}>
       <StatusBar barStyle="light-content" />

       {this.viewConnection()}

       <Content>
        {
          renderHeader &&
          <View>
            <ImageBackground source={{ uri:dataProps.img}} style={styles.headerImageBG}>
              <Header style={styles.header}>
                  <Left style={styles.left}>
                    <TouchableOpacity style={styles.backArrow}  onPress={()=>Actions.pop()}>
                      <FontAwesome name={I18nManager.isRTL ? "angle-right" : "angle-left"} size={25} color='white'/>
                    </TouchableOpacity>
                  </Left>
                  <Body style={styles.body}>
                    {/* <Text style={styles.textTitle}>Johnie Cornwall</Text> */}
                  </Body>
                  <Right style={styles.right}>
                    
                  </Right>
              </Header>

              <View style={styles.levelDescView}>
                <View style={{flexDirection:'row'}}>
                  <Left style={{flex:3}}>
                    <Text numberOfLines={1} style={styles.titleHeaderText}>{dataProps.name}</Text>
                    <View style={styles.starView}>
                      <Stars
                          half={true}
                          rating={4.0}
                          spacing={4}
                          starSize={20}
                          count={5}
                          disabled={true}
                          fullStar={Images.starFilled1}
                          emptyStar={Images.starEmpty1}
                          halfStar={Images.starHalf1} />
                      {/* <Text style={styles.descText}>
                        238 Reviews
                      </Text> */}
                    </View>
                    <View style={styles.placeDistanceBg}>
                      <View style={styles.mapPin}>
                        <FontAwesome name="map-marker" size={12} color="#51B252" />
                      </View>
                      <Text numberOfLines={1} style={styles.descHeaderText}>{dataProps.address}</Text>
                    </View>
                  </Left>
                  <Right style={[styles.contentHeaderRight, {flexDirection:'row',alignSelf: 'flex-end',alignItems: 'flex-end',justifyContent: 'flex-end', flex:1}]}>
                    <TouchableOpacity style={styles.cardHeaderButton}>
                      <View style={styles.headerButtonContent}>
                        <FontAwesome name="location-arrow" size={22} color="#51B252" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardHeaderButton}>
                      <View style={styles.headerButtonContent}>
                        <FontAwesome name="share-alt" size={22} color="#51B252" />
                      </View>
                    </TouchableOpacity>
                  </Right>
                </View>
              </View>
            </ImageBackground>

            {/* <View style={styles.profileContent}>
              <TouchableOpacity
                onPress={() => this.goToWA()}>
                  <Text style={styles.levelNo}><FontAwesome name={"phone"} size={32} color='white'/></Text>
              </TouchableOpacity>
            </View> */}

          </View>
        }
        
        {
          renderHeader && renderList &&
          <View>
            
            {/* <View style={styles.listMainView}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.separatorText}>Photos(25)</Text>
                <Right>
                  <Text style={[styles.separatorText, styles.mgRight]}>Lihat selengkapnya</Text>
                </Right>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewPhotos}>
                {
                  data.map((item,index)=>{

                    return(
                      <View key={index}>
                        <TouchableOpacity key={item} onPress={() => this.showImage(index)}>
                          <View key={index} style={styles.friendListView}>
                            <Image source={{uri:item.image}} style={styles.imgView}/>
                          </View>
                        </TouchableOpacity>
                        
                        <Modal animationType="slide" visible={this.state.modalVisible} onRequestClose={() => this.modalClose()} style={{backgroundColor: 'white'}}>
                            <ImageViewer imageUrls={images} saveToLocalByLongPress={false}/>
                        </Modal>
                      </View>
                    )
                  })
                }
              </ScrollView>
          </View> */}

          <View style={{backgroundColor:'#FFF'}}>
            <Text style={styles.separatorText}>Informasi Gunung</Text>
            <Text style={styles.descText}>{dataProps.desc}</Text>

            <View style={{flexDirection:'row'}}>
              <Left style={{flex:2}}>
                <Text style={styles.descText}>Lokasi</Text>
                <Text style={styles.descText}>Ketinggian</Text>
                <Text style={styles.descText}>Kesulitan</Text>
              </Left>
              <Right style={{flex:4}}>
                <Text numberOfLines={1} style={styles.descTextRight}>{dataProps.address}</Text>
                <Text numberOfLines={1} style={styles.descTextRight}>{dataProps.altitude} Mdpl</Text>
                <Text numberOfLines={1} style={styles.descTextRight}>{dataProps.type}</Text>
              </Right>
            </View>
          </View>

          <View style={styles.listMainView}>
            <View style={styles.rowBg}>
              <View style={{flexDirection:'row'}}>

                <Left style={styles.slide}>

                  <FontAwesome name="user-circle" size={48} style={styles.imageStyle} color="#CCCCCC"/>

                  <View style={styles.notificationContent}>
                    <View style={styles.titleBar}>
                      <Text style={styles.name}>Asep</Text>
                    </View>
                    <Text style={styles.comments}>087822516625</Text>
                  </View>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={() => this.goToWA()}>
                    <FontAwesome name="phone" size={48} style={styles.imageStyle} color="#CCCCCC"/>
                  </TouchableOpacity>
                </Right>
              </View>
            </View>
          </View>

          <View style={styles.listMainView}>
            {/* <Text style={styles.separatorText}>Informasi Jalur</Text> */}
            <ImageBackground source={{uri: "https://imgur.com/aotfl9z.png"}} style={styles.headerImageBG}>

            </ImageBackground>
          </View>

          {/* <View style={styles.listMainView}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.separatorText}>Kuota Bulan Ini</Text>
              <Right>
                <Text style={[styles.separatorText, styles.mgRight]}>Lihat selengkapnya</Text>
              </Right>
            </View>
            <Text style={styles.descText}>Ini Kuota</Text>
          </View> */}
        </View>
        }

        {	
					renderHeader && renderList && renderFooter &&
            <View>
              <View style={styles.listMainView}>
                {/* <View style={{flexDirection:'row'}}>
                  <Text style={styles.separatorText}>Reviews Terbaik</Text>
                  <Right>
                    <Text style={[styles.separatorText, styles.mgRight]}>Lihat selengkapnya</Text>
                  </Right>
                </View> */}
                
                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewPhotos}> */}
                {
                  dataFriends.map((item, index) => {
                    return (
                      <View style={styles.rowBg} key={index}>
                        <View style={styles.slide}>

                          <Image source={{uri:item.profile}} style={styles.imageStyle}/>

                          <View style={styles.notificationContent}>
                            <View style={styles.titleBar}>
                              <Text style={styles.name}>{item.name}</Text>
                              
                              <View style={styles.notification}>
                                <Stars
                                    half={true}
                                    rating={4.0}
                                    spacing={4}
                                    starSize={12}
                                    count={5}
                                    disabled={true}
                                    fullStar={Images.starFilled1}
                                    emptyStar={Images.starEmpty1}
                                    halfStar={Images.starHalf1} />
                              </View>
                            </View>
                            {
                              (item.comment == '') ? null :
                              <Text style={styles.comments}>{item.comment}</Text>
                            }
                            <View style={styles.bottombar}>
                              <Ionicons name="md-time" size={12} color="#d4d4d4" />
                              <Text style={styles.time}>{item.time}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.separatoeStyle}></View>
                      </View>
                    )
                  })
                }
                {/* </ScrollView> */}
              </View>
            </View>
        }

       </Content>
      </Container>

    );
  }
}
