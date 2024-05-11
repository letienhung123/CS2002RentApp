import { useEffect, useState } from "react"
import Style from "./Style"
import API, { endpoints } from "../../configs/API"
import HTML from 'react-native-render-html'
import { timeSince } from './TimeCal'

const { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image } = require("react-native")
const { default: MyStyles } = require("../../styles/MyStyles")

const Home = () => {
    const[posts, setPosts] = useState(null)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                let res = await API.get(endpoints['posts'])
                setPosts(res.data)
                
            } catch (ex) {
                console.error(ex)
            }
        }
        loadPosts();
    }, [])

    return (
        <View style={MyStyles.container}>
            <Text style={{color: 'red', fontSize:50}}>HOME</Text>
            <ScrollView style={Style.container} contentContainerStyle={Style.contentContainer}>
            {posts===null?<ActivityIndicator/>:<>
                { posts.map(c => (
                    <View key={c.id} style={Style.post}>
                        <View style={Style.header}>
                            <Image source={{uri: c.user.avatar_url}} style={Style.avatar}/>
                            <View style={Style.userInfo}>
                                <Text style={Style.username}>{c.user.first_name} {c.user.last_name}</Text>
                                <Text style={Style.time}>{timeSince(c.created_at)}</Text>
                            </View>
                        </View> 
                        <Text style={Style.title}>{c.title}</Text> 
                        <HTML source={{html: c.body}} style={Style.body} contentWidth={Style.post.width}/>
                        {c.rooms.map((room, index) => (
                            <View key={room.id}>
                            <Text>Phòng số {index + 1}</Text>
                            <Image source={{uri: room.image}}
                            style={Style.image}/>
                            </View>
                        ))}
                        {/* <Text style={Style.comments}>Bình luận: {c.comment_count}</Text>          */}
                    </View>
                ))}
            </>}
            </ScrollView>
        </View>
    )
}

export default Home