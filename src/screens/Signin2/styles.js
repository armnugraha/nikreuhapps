import { Platform, StyleSheet, Dimensions } from 'react-native';
// Screen Styles
import { Fonts, Metrics, Colors } from '../../resources/Themes';

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT,
	},
	header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
				marginTop: Fonts.moderateScale(25)
			}
    }),
		elevation: 0
  },
	left: {
    flex: 0.5,
		 backgroundColor: 'transparent',
  },
	backArrow: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30
  },
  body: {
		flex: 3,
		alignItems: 'center',
		backgroundColor: 'transparent'
  },
	textTitle: {
    color: "#000",
    fontSize: Fonts.moderateScale(16),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  right: {
    flex: 0.5
  },
	inputFieldStyles:{
		height: (Metrics.HEIGHT * 0.30),
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	containEmail:{
		backgroundColor: '#fff',
    height: (Metrics.HEIGHT * 0.08),
    width: (Metrics.WIDTH * 0.92),
    borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
	},
	inputEmail:{
		height: (Metrics.HEIGHT * 0.08),
    width: (Metrics.WIDTH * 0.84),
		color: "#000",
		paddingLeft: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
	containPassword:{
		backgroundColor: '#fff',
    height: (Metrics.HEIGHT * 0.08),
    width: (Metrics.WIDTH * 0.92),
    borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
	},
	divider: {
    width: (Metrics.WIDTH * 0.92),
		height: 0.6,
		backgroundColor: 'rgba(0,0,0,0.1)',
		left:15,
		right:15,
	},
	signbtnSec:{
		marginTop: Fonts.moderateScale(15),
		height: (Metrics.HEIGHT * 0.12),
	},
	signInBtn:{
		backgroundColor: "#4cd964",
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		borderRadius: 5,
    alignSelf: 'center',
    elevation: 3,
	},
	signInBtnText:{
		color: "#fff",
		fontSize: Fonts.moderateScale(17),
		width: (Metrics.WIDTH * 0.92),
		textAlign: 'center',
		fontFamily: Fonts.type.sfuiDisplaySemibold,
	},
	forgotPassword:{
		color: Colors.snow,
		fontSize: Fonts.moderateScale(15),
		height: (Metrics.HEIGHT * 0.05),
		width: (Metrics.WIDTH),
		alignSelf: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: Colors.transparent,
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
	socialSec:{
		height: (Metrics.HEIGHT * 0.38),
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: Fonts.moderateScale(20),
	},
	fbButton: {
		backgroundColor: "#3b5998",
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		borderRadius: 5,
		justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
	},
	fbButtonText:{
		color: Colors.snow,
		paddingLeft: Fonts.moderateScale(5),
		fontSize: Fonts.moderateScale(17),
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
});
export default styles;
