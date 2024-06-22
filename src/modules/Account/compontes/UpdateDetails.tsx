import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../Hooks/CustomHeader'
import { TextInput } from 'react-native-gesture-handler'
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUpdateUserMutation } from '../../../store/services/ServiceApis'
import { setUser } from '../../../store/slices'
import { ShowToster } from '../../Utiles'
import { useToast } from 'react-native-toast-notifications'




export default function UpdateDetails() {
  const user = useSelector((state: any) => state?.reusableStore?.userInfo)
  const [name, setName] = useState(user?.name);
  const [userName, setUserName] = useState(user?.userName);
  const [primaryNumber, setPrimaryNumber] = useState(user?.primaryNumber.toString());
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.profileUrl);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    primaryNumber: ''
  });
  const [updateUser] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const toast = useToast()

  const updateProfile = async () => {
    if (validateFields()) {
      let payload: any = {
        id: user?._id,
        body: {}
      }
      if (name !== user?.name) {
        payload.body.name = name
      } else if (primaryNumber !== user?.primaryNumber.toString()) {
        payload.body.primaryNumber = primaryNumber
      } else if (avatarUri !== user?.profileUrl) {
        payload.body.profileUrl = avatarUri
      }
      try {
        const response = await updateUser(payload).unwrap()
        if (response) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(response))
          dispatch(setUser(response))
          setIsEdited(false)
        }
      } catch (error: any) {
        ShowToster(toast, error?.message, '', 'error');
      }
    }
  }

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1 as const,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source1 = {
          uri,
          type,
          name,
        };
        uploadImage(source1);
        const source = response.assets[0].uri;
        if (source) {
          setAvatarUri(source);
          setAvatarError(null);
          setIsEdited(true);
        }
      }
    });
  };

  const uploadImage = (photo: any) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'cgvymfjn');
    data.append("cloud_name", "dnhbdmhp6");
    fetch("https://api.cloudinary.com/v1_1/dnhbdmhp6/image/upload", {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then(data => {
        console.log('data: ', data);
        setAvatarUri(data.secure_url);
        setAvatarError(null);
        AsyncStorage.setItem('login', 'true');
      }).catch(err => {
        // Alert.alert("An Error Occured While Uploading");
        setAvatarError("Failed to upload image");
      });
  };

  const checkIsEdited = () => {
    if (name !== user?.name || primaryNumber !== user?.primaryNumber.toString() || avatarUri !== user?.profileUrl) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  };

  useEffect(() => {
    checkIsEdited()
  }, [name, primaryNumber, avatarUri])

  const validateFields = () => {
    let valid = true;
    let errorsCopy = { name: '', primaryNumber: '' };

    if (!name.trim()) {
      errorsCopy.name = 'Name is required.';
      valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!primaryNumber.match(phoneRegex)) {
      errorsCopy.primaryNumber = 'Primary number must be 10 digits.';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <View>
      <CustomHeader tittle='Update Profile' Navigate='Profile' />
      <View style={styles.profileDetails}>
        <Image source={avatarUri ? { uri: avatarUri } : require('../../../assets/User.webp')} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIcon} onPress={() => handleChoosePhoto()}>
          <Icon name="edit" color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >userName :</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#dee2e6', borderColor: '#dee2e6' }]}
            placeholder="userName"
            value={userName}
            placeholderTextColor='#000'
            keyboardType='default'
            editable={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="userName"
            value={name}
            placeholderTextColor='#000'
            keyboardType='default'
            onChangeText={(e) => { setName(e) }}
          />
        </View>
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >primaryNumber :</Text>
          <TextInput
            style={styles.input}
            placeholder="primaryNumber"
            value={primaryNumber}
            placeholderTextColor='#000'
            keyboardType='phone-pad'
            onChangeText={(e) => { setPrimaryNumber(e) }}
          />
        </View>
        {errors.primaryNumber ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>
      <TouchableOpacity style={[styles.button, !isEdited && { opacity: 0.5 }]} onPress={() => { isEdited ? updateProfile() : '' }} disabled={isEdited ? false : true}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  profileDetails: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    width: "80%",
    marginBottom: 20
  },
  inputLable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    color: "#000",
    marginTop: 10
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 30
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    marginLeft: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  }
});
