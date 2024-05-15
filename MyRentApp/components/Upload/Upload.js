import React, { useContext, useEffect, useState } from 'react';
import {CheckBox} from 'react-native-check-box';
import { Text, View, TextInput, Button, Alert, Keyboard, Modal, Touchable, TouchableOpacity } from 'react-native';
import UploadStyle from './UploadStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { authApi, endpointRoomUser, endpoints } from '../../configs/API';
import MyContext from '../../MyContext';

const Upload = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [rooms, setRoom] = useState(null);
    // const [user, setUser] = useState('');
    const [user, dispatch] = useContext(MyContext)
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [idPost, setIdPost] = useState(null)

        

    useEffect(() => {

        const loadRooms = async () => {
            try {
                let res = await API.get(endpoints["user_room"](user.id));
                setRoom(res.data);               
            } catch (error) {
                console.error('Không lấy được danh sách rooms của user', error);
            }
        };
        loadRooms();
    }, [])
    
    const updateRoom = async (roomId, formData, config) => {
        try {
            await authApi(await AsyncStorage.getItem('token-access')).patch(endpoints["update_room"](roomId), formData, config);
        } catch (error) {
            console.error('Lỗi khi cập nhật phòng:', error);
        }
    };

    const handleUpload = async () => {
        
        const formData = new FormData()
            
        formData.append('title', title);
        formData.append('body', description);
        const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

        
        try {
            let res = await authApi(await AsyncStorage.getItem('token-access')).post(endpoints['create_post'], formData, config)
            setIdPost(res.data.id)
            Keyboard.dismiss();

            const formData1 = new FormData()
            formData1.append('field_name', 'post');
            formData1.append('field_value', res.data.id);
            const config1 = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
            };
            
            for (let roomId of selectedRooms) {
                await updateRoom(roomId, formData1, config1);
            }

            Alert.alert('Đăng bài thành công!')
        } catch (error) {
            console.error('Lỗi đăng bài!!', error);
        }

        console.log('Tiêu đề:', title);
        console.log('Mô tả:', description);

    };

    const updateRoomCur = async () => {
        try {
            const formData1 = new FormData()
            formData1.append('field_name', 'post');
            formData1.append('field_value', idPost + 1);
            const config1 = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
            };
            let res = await API.patch(endpoints["update_room"](9), formData1, config1);
        } catch (error) {
            console.error("Không update đc room nha trời ơi", error)
        }
    }

    const toggleRoomSelection = (roomId) => {
        // Kiểm tra xem phòng đã được chọn hay chưa
        const roomIndex = selectedRooms.indexOf(roomId);
        if (roomIndex === -1) {
          // Nếu chưa được chọn, thêm vào danh sách
          setSelectedRooms([...selectedRooms, roomId]);
        } else {
          // Nếu đã được chọn, loại bỏ khỏi danh sách
          const updatedSelectedRooms = selectedRooms.filter((id) => id !== roomId);
          setSelectedRooms(updatedSelectedRooms);
        }
      };

    return (
        <View style={UploadStyle.container}>
            <Text style={UploadStyle.title}>Upload</Text>
            <TextInput
                style={UploadStyle.input}
                placeholder="Tiêu đề"
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <TextInput
                style={UploadStyle.input}
                placeholder="Mô tả"
                onChangeText={text => setDescription(text)}
                value={description}
                multiline={true}
                numberOfLines={4}
            />
            <View>
                <Text style={UploadStyle.title}>Danh sách phòng của bạn:</Text>
                    {rooms && rooms.map((c, index) =>(
                        <TouchableOpacity key={c.id} onPress={() => toggleRoomSelection(c.id)}>
                        <Text style={{ color: selectedRooms.includes(c.id) ? 'blue' : 'black' }}>
                          Phòng số {index + 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
            </View>
            <Text>Phòng đã chọn: {selectedRooms.join(', ')}</Text>
            <Button
                title="Đăng bài"
                onPress={handleUpload}
            />
        </View>
    );
};

export default Upload;
