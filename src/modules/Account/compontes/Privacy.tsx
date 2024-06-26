import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../../Hooks/CustomHeader'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';

export default function Privacy() {
  const navigation: any = useNavigation();
  const handleAccept = () => {
    navigation.goBack();
  };
  return (
    <>
    <View>
      <CustomHeader tittle='Privacy & Policy' Navigate='Profile' />
    </View>
     <View style={styles.container}>
     <ScrollView style={styles.scrollView}>
       <Text style={styles.title}>Privacy Policy</Text>
       <Text style={styles.text}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
         lobortis, odio in feugiat sollicitudin, dolor lectus tincidunt lorem,
         non tempus massa odio a turpis. Phasellus eget justo bibendum, commodo
         metus id, ornare velit. Quisque in sapien ac est hendrerit pharetra in
         et neque. Maecenas at elit elit. Sed et neque eget dolor facilisis
         ultrices. Pellentesque habitant morbi tristique senectus et netus et
         malesuada fames ac turpis egestas. Donec eget scelerisque turpis.
         Donec euismod, ligula non malesuada ultricies, arcu dui congue felis,
         et accumsan urna leo sed est. Ut tempus ex a felis fringilla, a
         pharetra lacus bibendum. Vivamus bibendum orci quis massa malesuada,
         non cursus libero consequat. Fusce auctor et ligula nec auctor. Sed
         porta nec purus at tempus. Etiam venenatis dictum turpis, nec vehicula
         purus vestibulum id.
       </Text>
       <Text style={styles.text}>
         Vestibulum vel leo et mauris scelerisque aliquet. Nulla facilisi.
         Maecenas vehicula eros nec metus pretium, vel malesuada lectus
         suscipit. Nulla facilisi. Nam eget metus ac mi hendrerit convallis.
         Vivamus lobortis mauris vitae sapien vestibulum, et sodales metus
         iaculis. Proin condimentum massa ac augue tincidunt, sit amet
         efficitur nunc congue. Mauris gravida diam quis risus vulputate
         aliquet. Praesent et aliquet metus, id molestie risus. Aliquam erat
         volutpat. Etiam in venenatis sapien, non pellentesque nulla. Integer
         fermentum semper ex, id efficitur dolor vulputate id. Nam posuere
         felis sed semper malesuada.
       </Text>
       <Text style={styles.text}>
         Duis ut lacus a justo pretium interdum. Integer dictum nisi in nulla
         feugiat, at hendrerit arcu dignissim. Fusce id augue vestibulum,
         dictum purus et, ultricies ligula. Nullam tempor sapien eu ligula
         scelerisque, vel sagittis nulla sollicitudin. Vivamus tristique sapien
         vel fermentum scelerisque. In hac habitasse platea dictumst. Praesent
         tempus cursus sapien, non suscipit orci vestibulum at. Nam elementum
         risus nec libero dignissim tristique.
       </Text>
     </ScrollView>
     <TouchableOpacity style={styles.button} onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
    </TouchableOpacity>
   </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"#000"
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color:"#000"
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal:30
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});