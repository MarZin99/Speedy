import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";

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

  // function to check permissions and get Locatio
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
            ></Marker>
          )}
        </MapView>
      </View>
    </>
  );
}
