import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
      },
      post: {
        width: width - 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#c0c0c0',
        borderRadius: 10,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      room: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e9e9e9',
        borderRadius: 6,
      },
      image: {
        width: '100%',
        height: 200,
        borderRadius: 4,
      },
      contentContainer: {
        alignItems: "center"
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      userInfo: {
        marginLeft: 10,
      },
      username: {
        fontWeight: 'bold',
      },
      time: {
        fontSize: 12,
        color: '#666',
      },
      comments: {
        marginTop: 10,
        fontSize: 12,
        color: '#666',
      },
      body: {
        fontSize: 14,
      }
})