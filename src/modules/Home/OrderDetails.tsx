import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, Animated , Linking,PermissionsAndroid} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const navigation :any= useNavigation();
  const [headerHeight] = useState(new Animated.Value(height * 0.3));
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
    Animated.timing(headerHeight, {
      toValue: height * 0.1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(headerHeight, {
      toValue: height * 0.3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
      </Animated.View>
      <View style={styles.content}>
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
          <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(true)}>
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card1: {
    padding: 16,
    gap:16,
    color:"#000",
    justifyContent:'center',
    alignContent:'center'
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color:"#000"
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    color:"#000"
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
