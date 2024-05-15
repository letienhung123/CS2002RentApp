import { useEffect, useState } from "react"
import Style from "./Style"
import API, { endpoints } from "../../configs/API"
import HTML from 'react-native-render-html'
import { timeSince } from './TimeCal'
import { useNavigation } from '@react-navigation/native';

const { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, Modal, Button } = require("react-native")
const { default: MyStyles } = require("../../styles/MyStyles")

const Home = ({ navigation }) => {
    const [posts, setPosts] = useState(null)
    const [postId, setPostId] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const loadPosts = async () => {
        try {
            let res = await API.get(endpoints['posts'])
            setPosts(res.data)

        } catch (ex) {
            console.error(ex)
        }
    }

    const handleImagePress = (room) => {
        setSelectedRoom(room);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        loadPosts();
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPosts();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={MyStyles.container}>
            <ScrollView style={Style.container} contentContainerStyle={Style.contentContainer}>
                {posts === null ? <ActivityIndicator /> : <>
                    {posts.map(c => (
                        <View key={c.id} style={Style.post}>
                            <View style={Style.header}>
                                <Image source={{ uri: c.user.avatar_url }} style={Style.avatar} />
                                <View style={Style.userInfo}>
                                    <Text style={Style.username}>{c.user.first_name} {c.user.last_name}</Text>
                                    <Text style={Style.time}>{timeSince(c.created_at)}</Text>
                                </View>
                            </View>
                            <Text style={Style.title}>{c.title}</Text>
                            <HTML source={{ html: c.body }} style={Style.body} contentWidth={Style.post.width} />
                            {c.rooms.map((room, index) => (
                                <View key={room.id}>
                                    <Text>Phòng số {index + 1}</Text>
                                    <TouchableOpacity onPress={() => handleImagePress(room)}>
                                        <Image source={{ uri: room.image }}
                                            style={Style.image} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <TouchableOpacity onPress={() => {
                                
                                navigation.navigate('Comment', {postId: c.id});
                            }}>
                                <Text style={Style.comments}>Bình luận: {c.comment.length}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={Style.modalContainer}>
                        <View style={Style.modalContent}>
                            <Text style={Style.modalTitle}>Thông tin chi tiết phòng:</Text>
                            <Text style={Style.modalText}>Địa chỉ: {selectedRoom && selectedRoom.address}</Text>
                            <Text style={Style.modalText}>Giá: {selectedRoom && selectedRoom.cost}</Text>
                            <Text style={Style.modalText}>Số người ở: {selectedRoom && selectedRoom.num_people}</Text>

                            <TouchableOpacity style={Style.closeButton} onPress={closeModal}>
                                <Text style={Style.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

export default Home