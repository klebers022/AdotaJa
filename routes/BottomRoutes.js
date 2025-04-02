import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"


const Bottom = createBottomTabNavigator()

export default function BottomRoutes(){
    return(
       <Bottom.Navigator screenOptions={{ headerShown: false}}
        >
            <Bottom.Screen
                nome ="home"
                component={home}
                options={{tabBarIcon: ()=> <Image source={require("../assets/home.png")}  /> }}
            />
            
       </Bottom.Navigator>

    )
}