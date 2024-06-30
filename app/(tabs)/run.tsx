import { View, StyleSheet, Button, Alert, Pressable, Text } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import * as Location from "expo-location";
import ExpandableButton from "@/components/ExpandableButton";
import { MenuItem } from "@/models/MenuItem";

export default function RunScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [region, setRegion] = useState<Region>();
  const mapRef = useRef<MapView>(null);

  const resetPosition = () => {
    mapRef.current?.animateToRegion(region!, 600);
  };

  const menuItems: MenuItem[] = [
    { title: "Start run", onClick: () => Alert.alert("menuItemCostam") },
    {
      title: "Reset position",
      onClick: resetPosition,
    },
  ];

  useEffect(() => {
    //Revoke sometime -> to edit
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
        .then((res) => {
          setLocation(res);
          setRegion({
            longitude: res.coords.longitude,
            latitude: res.coords.latitude,
            longitudeDelta: 0.007,
            latitudeDelta: 0.007,
          } as Region);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <>
      <View>
        <MapView
          style={{ width: "100%", height: "90%" }}
          region={region}
          ref={mapRef}
        >
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
        <ExpandableButton menuItems={menuItems} />
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
