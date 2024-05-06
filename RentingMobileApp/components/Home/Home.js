import { View, Text, ActivityIndicator } from "react-native"
import MyStyles from "../../styles/MyStyles"
import Styles from "./Styles"
import React, { useEffect, useState } from "react"
import API, { endpoints } from "../../configs/API"

const Home = () =>{
    const [posts, setPosts]= React.useState(null)

    React.useEffect(() => {
        const loadPosts = async() => {
            try {
                let res = await API.get(endpoints['posts']);
                setPosts(res.data.results)
                res.data
            } catch (ex) {
                console.error(ex);
            }

        }   
        loadPosts();     
    }, []);

    return (
        <View style={MyStyles.container}>
            <Text style={Styles.post}>HOME</Text>
            {posts===null?<ActivityIndicator/>:<>
               {posts.map(c => (
                   <View key={c.id}>
                        <Text>{c.title}</Text>
                   </View>
                ))}
            </>}
        </View>
    )
}

export default Home