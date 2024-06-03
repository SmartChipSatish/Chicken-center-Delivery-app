import { View, Text, StyleSheet ,Image,Modal, TouchableOpacity} from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';

interface QRmodalProps{
   modalVisible:any,
   setModalVisible:any
}

const QRmodal:React.FC <QRmodalProps>= ({modalVisible,setModalVisible})=> {
  return (
   <Modal
   animationType="slide"
   transparent={true}
   visible={modalVisible}
   onRequestClose={() => {
     setModalVisible(!modalVisible);
   }}
 >
   <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <Text style={styles.modalTitle}>QR Code</Text>
       <Image
         source={{ uri: 'https://dummyimage.com/200x200/000/fff.png&text=QR+Code' }}
         style={styles.qrCodeImage}
       />
       <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
         <Text style={styles.closeButtonText}>Close</Text>
       </TouchableOpacity>
     </View>
   </View>
 </Modal>

  )
}

const styles=StyleSheet.create({
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    qrCodeImage: {
      width: 200,
      height: 200,
      marginBottom: 16,
    },
    closeButton: {
      backgroundColor: THEME_COLORS.secondary,
      padding: 10,
      borderRadius: 4,
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
})

export default QRmodal