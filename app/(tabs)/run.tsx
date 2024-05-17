import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import * as Location from "expo-location";

export default function RunScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permission granted");
      } else {
        {
          console.log("Permission not granted");
        }
      }

      await Location.getCurrentPositionAsync()
        .then((res) => setLocation(res))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <>
      <View>
        <MapView style={{ width: "100%", height: "90%" }}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <Image
                style={styles.markerImage}
                source={require("../../assets/images/navigation-arrow.png")}
              />
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  markerImage: {
    width: 25,
    height: 25,
  },
});
