import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
    alignItems: 'center',
    marginHorizontal:16,
    marginBottom: 16, // Adjust this value to control the space between the header and other elements
  },
  greyHeader: {
    color:'grey'
  },
    alignRight:{
      textAlign:"right",
      marginRight:8
    },
     headerBackground: {
      backgroundColor:'#4F47C7',
    borderRadius: 200, // Adjust this value to change the oval shape
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop:16,
    marginBottom:16
  },
  accountId: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
    marginLeftHeader:{
      marginLeft:12
    },
    inClubContainer: {
      flex: 1,
      backgroundColor: '#949296',
    },
    primaryColor:{
      color:"#4F47C7"
    },
    submitButton:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingBottom: 6,
      marginBottom:12,
      backgroundColor:"#4F47C7",
      paddingHorizontal:8
      
    },
    actionButton: {
      position: 'absolute',
      bottom: 40, // Adjust this value to set the distance from the bottom
      right: 40, // Adjust this value to set the distance from the right
      width: 60,
      height: 60,
      borderRadius: 30, // Half of the width and height to make it circular
      backgroundColor: '#4F47C7', // Your desired background color
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Add elevation for a slight shadow effect (Android)
      shadowColor: '#000', // Shadow color (iOS)
      shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
      shadowOpacity: 0.8, // Shadow opacity (iOS)
      shadowRadius: 3, // Shadow radius (iOS)
    },

    bigHeaderText:{
        fontWeight: 'bold',
        fontSize: 40,
    },
    primaryColorHeader:{
      color:"#4F47C7",
      fontWeight: 'bold',
        fontSize: 40,
    },
    checkoutData:{
      color:"#4F47C7",
      fontWeight: 'bold',
        fontSize: 32,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 32,
    },
    headerSubLabel:{
      fontWeight: 'bold',
      fontSize: 22
  },
  verticalFormat:{
    marginVertical:8
  },
    formLabel:{
        fontWeight: 'bold',
        fontSize: 22,
        marginTop:10
    },
    checkoutText:{
      fontSize:24,
    },
    

    textInputStyle:{
        backgroundColor:"white",
        alignSelf: "stretch",
        marginBottom:15

        
    },
    pictureAndTitleLayOut:{
      marginBottom:"25%",
      marginTop:"40%",
      marginLeft:"5%"
      
    },
    footer: {
     
      justifyContent: 'space-between',
    
     },
     stretchFormItems:{
     
        justifyContent: 'space-between',
        alignItems:"stretch",
        flexDirection:"row",
        marginVertical:24
     },
     bottomHeaderMargin:{
        marginBottom:24
     },
     bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      //marginBottom: 36
    },
     tabIcon: {
      fontSize:32
    },
    
  });


  export default styles;