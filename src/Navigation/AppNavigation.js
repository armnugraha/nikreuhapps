import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
	Dimensions,
	AsyncStorage
} from 'react-native';

import { Router, Scene} from 'react-native-router-flux';

import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const { width, height } = Dimensions.get("window");


import WalkThroughScreen from "../screens/BaseActivity/walkthrough/index";
import MainActivity from '../screens/MainActivity/index';
import AdminMainActivity from '../screens/MainActivity/index_admin';
import Index from '../screens/BaseActivity/index';
import Signin from '../screens/BaseActivity/Signin/index';
import Signup from '../screens/BaseActivity/SignUp/index';
import '../stores/global';

/*Bubbdy Drawer START*/
const MainStackBubbdy = createStackNavigator(
	{
	  Login: { screen: Signin },
	  SignUpscreen: { screen: Signup },
	  Index: { screen: Index }
	},
	{
	  headerMode: "none",
	  navigationOptions: {
		gesturesEnabled: false
	  }
	}
);

const WalkThroughInclLogin =
	createStackNavigator(
		{
		  	WalkThroughScreen: { screen: WalkThroughScreen },
		  	SigninScreen: { screen: Signin },
		  	SignUpScreen: { screen: Signup },
			Index: { screen: Index },
			MainActivityScreen: { screen: MainActivity},
			AdminMainActivity: { screen: AdminMainActivity}
		},
		{
		  headerMode: "none",
		  navigationOptions: {
			gesturesEnabled: false
		  }
		}
	)
/*Bubbdy Drawer END*/

const Testing = createStackNavigator(
	{
	  Index: { screen: Index }
	},
	{
	  headerMode: "none",
	  navigationOptions: {
		gesturesEnabled: false
	  }
	}
);

const PrimaryNav = 
	// hasLogin == false ? 
	createStackNavigator(
		{
		  WalkThroughInclLogin: { screen: WalkThroughInclLogin },
		  IndexScreen: { screen: Testing }
		},
		{
		  headerMode: "none",
		  initialRouteName: "IndexScreen",
		  gesturesEnabled: false
		}
	)
	// : 
	// createStackNavigator(
	// 	{
	// 	  MainStackBubbdy: { screen: MainStackBubbdy }
	// 	},
	// 	{
	// 	  headerMode: "none",
	// 	  initialRouteName: "MainStackBubbdy",
	// 	  gesturesEnabled: false
	// 	}
	// );
  
// const App = createAppContainer(PrimaryNav);
  
export default PrimaryNav;