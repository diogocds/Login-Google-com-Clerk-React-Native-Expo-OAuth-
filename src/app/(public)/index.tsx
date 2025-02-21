import { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as webBrowser from 'expo-web-browser';
import * as Liking from 'expo-linking';

import {useOAuth} from '@clerk/clerk-expo'; // Autenticação Google etc.

import {Button} from '@/components/button';

webBrowser.maybeCompleteAuthSession();

export default function SignIn(){
    const [isLoading, setIsLoading] = useState(false)
    const googleOAuth = useOAuth({strategy:"oauth_google"})  // Autenticação Google etc.

    async function onGoogleSignIn() {
        try {
            setIsLoading(true)

            const redirectUrl = Liking.createURL('/(auth)');
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl});

            if(oAuthFlow.authSessionResult?.type === "success")
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
                }else {
                    setIsLoading(false) 
                }

        } catch (error) {
         console.log(error)  
         setIsLoading(false) 
        }
    }
    useEffect(()=>{
        webBrowser.warmUpAsync() 
        return () => {
            webBrowser.coolDownAsync()
        }
    }, [])

return (
<View style={styles.container}>
<Text style={styles.title}>Entrar</Text>
<Button icon="logo-google" title="Entrar com Google" onPress={onGoogleSignIn} isLoading={isLoading}/>
</View>

)
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 12,
},

title:{
    fontSize:22,
    fontWeight:"bold",
},

})