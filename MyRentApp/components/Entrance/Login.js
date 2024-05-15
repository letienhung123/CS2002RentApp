import React, {useContext, useState} from 'react';
import { View, Button, StyleSheet, TextInput, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../MyContext';
import API, { authApi, endpoints } from '../../configs/API';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useContext(MyContext)
  

  const handleLogin = async () => {
    
        try {  
            setLoading(true);
            
            const formData = new FormData()
            formData.append('client_id', 'nPnQNVZzkyzSW5O0hhHsONo4smnuW1NzlxTjGgGA');
            formData.append('client_secret', 'KSQtLXdfrlBODuH5Uk3MwYCxzMy5TUbPoGcQk1SnEuAQJhVzXWiRCjUWbUy7OdOGfbHtMAbyNEcrai3WEEsMrOLHihHz3yeA5UFKY8Oj7OmpnGuTZXn6joY8wrgyB6ww');
            formData.append('username', username);
            formData.append('password', password);
            formData.append('grant_type', 'password');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            let res = await API.post(endpoints['login'], formData, config);

            await AsyncStorage.setItem('token-access', res.data.access_token)

            let user = await authApi(res.data.access_token).get(endpoints['current_user']);
            await AsyncStorage.setItem('user', JSON.stringify(user.data));

            dispatch({
              'type': 'login',
              'payload': {
                  'id': user.data.id,
              }
          })

            navigation.navigate('Main')

            console.info(user.data)

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            Alert.alert("Thông tin đăng nhập không đúng", "Vui lòng nhập lại!")
        } finally {
          setLoading(false);
        }
    
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      <Text style={{color: 'blue',alignContent: 'center', fontSize: 50}}>ĐĂNG NHẬP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        onChangeText={setUsername}
        value={username}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
  
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Đăng kí tài khoản mới</Text>
      </TouchableOpacity>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  signUpText: {
    paddingTop:30,
    color: '#007bff',
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
export default Login;