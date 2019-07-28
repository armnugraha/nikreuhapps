import React, { Component } from "react";
import {
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  I18nManager,
  ToastAndroid
} from "react-native";
import { Button, Text, Container, Content, Header, Left, Body, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Stars from 'react-native-stars';
import { Images } from '../../../resources/Themes';
import styles from "./styles";

export default class NavigationScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            visible: false,
            modalVisible: false,
            description:""
        }
    }

    onCancel() {
        this.setState({visible:false});
    }

    onOpen() {
        this.setState({visible:true});
    }
    
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    sendReview(){
        this.toggleModal(false)

        ToastAndroid.show('Terimakasih telah berbagi pengalaman bersama kami', ToastAndroid.SHORT)
    }

    render(){

        return(
            <Container style={styles.main}>

                <Header androidStatusBarColor={"#F4F4F4"} style={styles.header}>
                    <Body style={{flex:4}}>
                        <Text style={{color: "#FFF"}}>Jalur Pendakian Gunung</Text>
                    </Body>
                </Header>

                <StatusBar barStyle="dark-content" />

                <Content>
                    <View style={styles.rowBg}>
                        <View style={styles.rowView}>
                            <View style={styles.namePostView}>
                                <Text style={styles.rowNameTxt} numberOfLines={1}>Gunung Manglayang (via Batu Kuda)</Text>
                            </View>
                            <View style={{justifyContent: 'center', flexDirection:"row"}}>
                                {/* <TouchableOpacity style={styles.followBgSelected} onPress = {() => this._fnChangeItem()}><Text style={styles.followTxtSelected}>Follow</Text></TouchableOpacity> */}
                                {/* <TouchableOpacity style={styles.followBgNotSelected} onPress = {() => this._fnChangeItem()}><Text style={styles.followTxtNotSelected}>Follow</Text></TouchableOpacity> */}
                                <TouchableOpacity onPress={() => Actions.push("maps_record")} style={styles.followBgSelected}>
                                    <Ionicons name="ios-disc" size={18} color="#FF7878" style={{alignSelf:"center"}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toggleModal(true)} style={styles.followBgSelected}>
                                    <FontAwesome name="star" size={18} color="#FFE70B" style={{alignSelf:"center"}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Actions.push("maps")} style={styles.followBgSelected}>
                                    <FontAwesome name="arrow-right" size={18} color="#51B252" style={{alignSelf:"center"}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.dividerHorizontal}/>
                    </View>

                    {/* Screen Modal */}
                    <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.toggleModal(!this.state.modalVisible);
                        }}
                    >
                        <View style={styles.modalmain}>
                            <View style={styles.modal}>
                                <Text style={styles.nameTxt}>Review</Text>
                                <View style={styles.followerFollowingBg}>
                                    <Stars
                                        style={styles.followerFollowingTxt}
                                        half={true}
                                        spacing={4}
                                        starSize={24}
                                        count={5}
                                        fullStar={Images.starFilled1}
                                        emptyStar={Images.starEmpty1}
                                        halfStar={Images.starHalf1}
                                    />
                                </View>
                                <View style={styles.followerFollowingBg}>
                                    
                                    <View style={styles.bodyFormInputArea}>
                                        <View style={styles.searchViewFormInput}>
                                            <FontAwesome name="envelope" size={18} color="#616161" />
                                        </View>

                                        <Input
                                            textAlign={I18nManager.isRTL ? "right" : "left"}
                                            placeholder="Description"
                                            placeholderTextColor="#616161"
                                            underlineColorAndroid="transparent"
                                            returnKeyType='next'
                                            multiline
                                            autoCapitalize='none'
                                            selectionColor={"#6f6f6f"}
                                            style={styles.searchTextFormInput}
                                            onChangeText={(text) => {this.setState({description:text})}}
                                        />
                                    </View>
                                    
                                </View>
                                
                                <View style={styles.followerFollowingBg}>
                                    <TouchableOpacity
                                        info
                                        style={styles.signInbtn}
                                        onPress={() => this.sendReview()}
                                    >
                                        <Text autoCapitalize="words" style={styles.buttongetstarted}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                            style={styles.closeIconBg}
                            onPress={() => this.toggleModal(false)}
                            >
                                <FontAwesome name="close" size={15} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Content>
            </Container>
        )
    }
}