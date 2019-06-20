
import React, { Component } from 'react';
import { Text, View, Image, StatusBar, Platform, ImageBackground ,TouchableOpacity, BackHandler,I18nManager} from 'react-native';
import { Container, Button, Icon, Right, Item, Input, Header, Left, Body, Title, Content} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Screen Styles
import styles from './styles';
import { Actions } from 'react-native-router-flux';

export default class Signin extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  renderHeader: false,
		  renderList: false,
		  renderFooter: false
		}
	}

	componentDidMount() {
		setTimeout(() => {this.setState({renderHeader: true})}, 0);
		setTimeout(() => {this.setState({renderList: true})}, 0);
		setTimeout(() => {this.setState({renderFooter: true})}, 0);
	}

	componentWillMount() {
		// var that = this
		// BackHandler.addEventListener('hardwareBackPress', function() {
		// 	that.props.navigation.navigate('Home')
		// 	return true;
		// });
	}
	  
	render(){
		let BG_Image = { uri : 'https://antiqueruby.aliansoftware.net/Images/signin/ic_main_bg_stwo.png'};
		StatusBar.setBarStyle('dark-content', true);

		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
		}

		const {
			renderHeader,
			renderList,
			renderFooter
		  } = this.state;
		
		  const {
			data,
			meta
		  } = this.props;

		return(
			<Container>
				<ImageBackground style={styles.backgroundImage} source={BG_Image}>
					{
						renderHeader &&
						<Header style={styles.header}>
							<Left style={styles.left}>
								<TouchableOpacity style={styles.backArrow} onPress={()=>this.props.navigation.navigate('Home')}>
									<FontAwesome name={I18nManager.isRTL ? "angle-right" : "angle-left"} size={30} color="#6f6f6f"/>
								</TouchableOpacity>
							</Left>
							<Body style={styles.body}>
								<Text style={styles.textTitle}>Sign In</Text>
							</Body>
							<Right style={styles.right}/>
						</Header>
					}
					
					{
						renderHeader && renderList &&
						<Content>
							<View style={styles.inputFieldStyles}>
								<View style={styles.containEmail}>
									<Input
										ref='email'
										style={styles.inputEmail}
										editable={true}
										keyboardType='email-address'
										returnKeyType='next'
										autoCapitalize='none'
										autoCorrect={false}
										underlineColorAndroid='transparent'
										textAlign={I18nManager.isRTL ? 'right' : 'left'}
										placeholder='Email'
										placeholderTextColor="rgba(0,0,0,0.20)" />
								</View>
								<View style={styles.divider}/>
								<View style={styles.containPassword}>
									<Input
										ref='password'
										style={styles.inputEmail}
										editable={true}
										keyboardType='default'
										returnKeyType='next'
										autoCapitalize='none'
										autoCorrect={false}
										underlineColorAndroid='transparent'
										textAlign={I18nManager.isRTL ? 'right' : 'left'}
										placeholder='Password'
										placeholderTextColor="rgba(0,0,0,0.20)"
										secureTextEntry={true}/>
								</View>
							</View>
							<View style={styles.signbtnSec}>
								<Button style={styles.signInBtn} onPress={() => Actions.push("mainActivity")}>
									<Text style={styles.signInBtnText}>Sign In</Text>
								</Button>
							</View>
							<Text style={styles.forgotPassword} onPress={() => alert("Forgot Password")}>Forgot your password?</Text>
						</Content>
					}
					
					{
						
						renderHeader && renderList && renderFooter &&
						<View style={styles.socialSec}>
							<Button iconRight style={styles.fbButton} onPress={() => alert("FaceBook")}>
								<FontAwesome name="facebook" size={28} color="#ffffff" />
								<Text style={styles.fbButtonText}>Sign in with facebook</Text>
							</Button>
						</View>
					}
				</ImageBackground>
			</Container>
		);
	}
}
