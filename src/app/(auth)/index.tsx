import { useAuth, useUser } from '@clerk/clerk-expo';
import {Button} from '@/components/button'
import { View , Text, StyleSheet, Image } from "react-native";

export default function Home(){
    const { user } = useUser();
    const { signOut } = useAuth();

    return(     
        <View style={styles.container}>
            <Image source={{ uri: user?.imageUrl }}style={styles.image}/>
            <Text style={styles.text}>{user?.fullName}</Text>
            <Button icon="exit" title="Sair" onPress={() => signOut()} />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
    flex: 1,
     alignItems:"center",
     justifyContent:"center",
     gap: 12,
     padding:32,
    },

  
    text:{
        color:"black",
        fontSize:18,
        fontWeight:"bold",
    },

    image:{
        width: 92,
        height: 92,
        borderRadius: 12,
    },
    
    })
