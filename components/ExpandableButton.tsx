import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { MenuItem } from "@/models/MenuItem";

type Props = { menuItems: MenuItem[] };
export default function expandableButton({ menuItems }: Props) {
  const [revealMenu, setRevealMenu] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {menuItems && revealMenu && (
        <View style={styles.optionsContainer}>
          {menuItems.map((item, key) => (
            <View style={styles.option} key={key}>
              <Pressable onPress={item.onClick}>
                <Text style={styles.optionText}>{item.title}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
      <View style={styles.startButton}>
        <Pressable
          style={styles.startButton}
          onPress={() => setRevealMenu(!revealMenu)}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={32} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: { bottom: 75 },
  optionText: {
    color: "white",
    fontSize: 20,
  },
  option: {
    backgroundColor: "rgba(151 151 151 / 0.6)",
    marginTop: 6,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  container: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
  },
  startButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 65,
    backgroundColor: "red",
    width: 65,
    height: 65,
  },
  buttonText: {
    color: "white",
    fontSize: 36,
  },
});
