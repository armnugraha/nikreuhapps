import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../../../resources/Themes';

const styles = StyleSheet.create({

  header: {
    backgroundColor: "#51B252",
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
    backgroundColor: Colors.transparent,
  },
  backArrow:{
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuIconWhite: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: 'column'
  },

  rowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    marginLeft: (Metrics.WIDTH) * 0.016,
    marginTop: (Metrics.HEIGHT) * 0.058,
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    textAlign: 'left'
  },

  rowDesignationTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(13),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  dividerHorizontal: {
    width: ((Metrics.WIDTH) * 0.99) + 5,
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#D7D7D7",
    alignSelf: 'flex-end',
  },

  followBgNotSelected: {
    width: (Metrics.WIDTH) * 0.18,
    height: (Metrics.HEIGHT) * 0.035,
    borderRadius: (Metrics.HEIGHT) * 0.045,
    borderWidth: 1,
    borderColor: "#0691ce",
    marginRight: (Metrics.WIDTH) * 0.03,
    justifyContent:'center'
  },

  followBgSelected: {
    // width: (Metrics.WIDTH) * 0.04,
    height: (Metrics.HEIGHT) * 0.035,
    borderRadius: (Metrics.HEIGHT) * 0.045,
    backgroundColor: "transparent",
    marginLeft: (Metrics.WIDTH) * 0.03,
    marginRight: (Metrics.WIDTH) * 0.03,
    justifyContent:'center'
  },

  followTxtSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow,
    alignSelf: 'center',
  },

  followTxtNotSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: "#0691ce",
    alignSelf: 'center',
  },

  listMainView:{
    width: (Metrics.WIDTH)
  },

  rowView:{
    flexDirection: 'row',
    marginBottom:(Metrics.HEIGHT) * 0.015
  },

  namePostView:{
    flexDirection: 'column',
    marginLeft: (Metrics.WIDTH) * 0.032,
    width: (Metrics.WIDTH) * 0.64,
    justifyContent: 'center'
  },

  modalmain:{
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "#0006"
  },
  ShowProfileTxt: {
    color: "#fff",
    backgroundColor: "#2d324f",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.SFUIDisplaySemibold,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.40
  },

  modal: {
      width: (Metrics.WIDTH) * 0.80,
      height: (Metrics.HEIGHT) * 0.66,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (Metrics.HEIGHT)  * 0.15,
      flexDirection: 'column',
      backgroundColor:"#FFF"
   },

   followerFollowingBg: {
     width: (Metrics.WIDTH) * 0.64,
     marginTop: 15,
     backgroundColor: 'transparent',
     flexDirection: 'column'
   },

   followerFollowingCountTxt: {
     color: "#363636",
     fontSize: Fonts.moderateScale(15),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     textAlign: 'left',
   },

   followerFollowingTxt: {
     color: "#959595",
     fontSize: Fonts.moderateScale(12),
     fontFamily: Fonts.type.SFUIDisplayRegular,
     textAlign: 'left',
   },

   nameTxt: {
     color: "#6f6f6f",
     fontSize: Fonts.moderateScale(18),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
   },

   nameTxtModal: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.SFUIDisplayMedium,
    alignSelf: 'center',
  },

   designationTxt: {
     color: "#b7b7b7",
     fontSize: Fonts.moderateScale(12),
     fontFamily: Fonts.type.SFUIDisplayRegular,
     alignSelf: 'center',
   },

   followTxtBg: {
     backgroundColor: "#0691ce",
     borderRadius: 20,
     width: (Metrics.WIDTH) * 0.45,
     alignSelf: 'center',
     marginTop: 20
   },

   followTxt: {
     color: "#fff",
     fontSize: Fonts.moderateScale(18),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
     paddingTop: 5,
     paddingBottom: 5,
   },

   closeIconBg: {
     height:(Metrics.HEIGHT * 0.040),
     width:(Metrics.HEIGHT * 0.040),
     borderRadius: (Metrics.HEIGHT * 0.02),
     backgroundColor: Colors.black,
     borderWidth: 2,
     borderColor: Colors.snow,
     marginTop: (Metrics.HEIGHT * 0.135),
     marginLeft: (Metrics.WIDTH * 0.075),
     position: 'absolute',
     alignSelf: 'flex-start',
     justifyContent: 'center',
     alignItems: 'center',
     paddingBottom: (Metrics.HEIGHT * 0.001)
   },

   bodyFormInputArea: {
    borderColor: "transparent",
    justifyContent: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.6,
    flexDirection:'row',
    backgroundColor: "transparent",
    borderRadius:5,
    height: (Metrics.HEIGHT * 0.124),
    marginTop: (Metrics.HEIGHT * 0.012),
    borderColor:'#E2E2E2',
    borderWidth: 2,
    borderRadius:20,
    backgroundColor:"#E2E2E2"
  },

  searchViewFormInput:{
    justifyContent:'center',
    alignItems:'center',
    alignContent:"center",
    alignSelf:"center",
    marginLeft: (Metrics.WIDTH) * 0.03,
    backgroundColor: 'transparent',
    height:30
  },

  searchTextFormInput:{
    flex:2,
    // height:(Metrics.HEIGHT) * 0.066,
    marginLeft: (Metrics.WIDTH) * 0.02,
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: "#616161",
    alignSelf:'center',
    backgroundColor: 'transparent',
  },

  signInbtn: {
    backgroundColor: "#51B252",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    // 0.8
    width: Metrics.WIDTH * 0.6,
    marginTop: 35
  },
  buttongetstarted: {
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: Colors.snow
  }

});

export default styles;