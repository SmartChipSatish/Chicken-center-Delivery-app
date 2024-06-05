import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, Animated, Linking, PermissionsAndroid, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import INR from 'react-native-vector-icons/FontAwesome'
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import { formatTimestamp } from '../Utiles';
import QRmodal from './Componets/QRmodal';


interface Item {
  id: number;
  name: string;
  AssignedBy: string;
  location: string;
  orderAt: string;
}

type RootStackParamList = {
  OrderDetails: { item: Item };
};

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

interface OrderDetailsProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ route }) => {
  const { item } = route.params;
  const [otp, setOtp] = useState('');
  const navigation: any = useNavigation();
  const [headtext,setHeadtext]:any=useState(true)
  const [headerHeight] = useState(new Animated.Value(height * 0.2));
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setHeadtext(false)
    Animated.timing(headerHeight, {
      toValue: height * 0.1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardDidHide = () => {
    setHeadtext(true)
    Animated.timing(headerHeight, {
      toValue: height * 0.2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header,{height:headerHeight}]}>        
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
      </View>{
        headtext && 
        <View style={styles.headerContent}>
          <TimeIcon name="timer-cog-outline" size={60} color="#fff" />
          <Text style={styles.headerInnerText}>you have 40 minutes Time to delivery this order</Text>
        </View>
        }
      </Animated.View>
      <View style={styles.content}>
        <View>
          <View style={styles.ItemCard}>
            <Image source={require('../../assets/logo.png')} style={styles.ItemImage} />
            <Text style={styles.ItemCardText}>Chicken-Legs</Text>
            <Text style={styles.ItemCardText}>
              <INR name="inr" size={20} color={THEME_COLORS.secondary} />
              30
            </Text>
          </View>
          <View style={styles.ItemCard}>
            <Image source={require('../../assets/logo.png')} style={styles.ItemImage} />
            <Text style={styles.ItemCardText}>Chicken-Legs</Text>
            <Text style={styles.ItemCardText}>
              <INR name="inr" size={20} color={THEME_COLORS.secondary} />
              30
            </Text>
          </View>
        </View>

        <View style={styles.card1}>
          <Text style={styles.detail}><Text style={styles.bold}>Name:</Text> {item.name}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>AssignedBy:</Text> {item.AssignedBy}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>Location:</Text> {item.location}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>OrderAt:</Text> {formatTimestamp(item.orderAt)}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor='#000'
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        modalVisible && <QRmodal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: THEME_COLORS.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    padding: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 40
  },
  headerInnerText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    marginVertical: 1,
    marginHorizontal: 10,
    letterSpacing: 2
  },
  content: {
    flex: 1,
    padding: 16,
  },
  ItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  ItemImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  ItemCardText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  card1: {
    padding: 16,
    gap: 16,
    color: "#000",
    justifyContent: 'center',
    alignContent: 'center'
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000"
  },
  bold: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,

  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
    color: "#000"
  },
  verifyButton: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OrderDetails;
