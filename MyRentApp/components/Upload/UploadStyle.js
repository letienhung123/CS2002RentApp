import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // Màu nền trắng
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20, // Khoảng cách dưới
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc", // Màu viền
        borderRadius: 5, // Độ bo tròn
        paddingHorizontal: 10, // Padding ngang
        marginBottom: 20, // Khoảng cách dưới
    },
    descriptionInput: {
        height: 100, // Chiều cao của TextInput mô tả
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền với độ mờ là 0.5 để tạo hiệu ứng mờ khi modal hiển thị
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
});
