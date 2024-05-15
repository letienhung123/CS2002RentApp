import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';

export default function Search() {
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);

    const handleMapPress = event => {
        const { coordinate } = event.nativeEvent;
        setSelectedCoordinate(coordinate);
    };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: 10.765766,
                    longitude: 106.636238,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={handleMapPress}
            >
                {selectedCoordinate && (
                    <Marker
                        coordinate={selectedCoordinate}
                        title={'Điểm được chọn'}
                    />
                )}
            </MapView>
            {selectedCoordinate && (
                <View style={styles.selectedCoordinateInfo}>
                    <Text style={styles.infoText}>Latitude: {selectedCoordinate.latitude}</Text>
                    <Text style={styles.infoText}>Longitude: {selectedCoordinate.longitude}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '80%',
    },
    selectedCoordinateInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});