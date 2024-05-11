import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import UserStyle from "./UserStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';




const User = ({navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ AsyncStorage khi component được render
        const getUserInfo = async () => {
          try {
            const userInfo = await AsyncStorage.getItem('user');
            if (userInfo !== null) {
              setUser(JSON.parse(userInfo));
            }
          } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
          }
        };
    
        getUserInfo();
      }, []);

    const handleLogout = () => {
        // Thực hiện logic đăng xuất ở đây (ví dụ: xóa token, đặt state isLoggedIn về false, vv.)
        
        // Chuyển hướng về màn hình đăng nhập
        navigation.navigate('Login');
    };

    return (
        <View style={UserStyle.container}>
            {user ? (
                <View style={styles.userInfoContainer}>
                    <Image source={{uri: user.avatar_url}} style={styles.avatar} />
                    <Text style={styles.userInfo}>Tên: {user.first_name} {user.last_name}</Text>
                    <Text style={styles.userInfo}>Số điện thoại: {user.phone_num}</Text>
                    <Text style={styles.userInfo}>Vai trò: {user.phone_num}</Text>
                </View>
            ) : (
                <Text>Không có thông tin người dùng</Text>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );  
}
const styles = StyleSheet.create({
    userInfoContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});
export default User