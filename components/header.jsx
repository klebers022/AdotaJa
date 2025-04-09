import { View, Image, StyleSheet } from 'react-native';


export default function Header() {

    return(

    <View style={styles.header}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    header: {
      height: 100, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ff914d",
      paddingTop: 30,
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },});