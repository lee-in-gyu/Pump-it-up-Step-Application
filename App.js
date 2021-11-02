import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { theme } from "./color";
import db from "./data.json";

const songList = db.songs;
const singleList = db.Slevel;
const doubleList = db.Dlevel;

export default function App() {
  const [level, setLevel] = useState();
  const levelToggle = (lv) => setLevel(lv);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {singleList.map((lev) => (
          <TouchableOpacity key={lev.id} onPress={() => levelToggle(lev.level)}>
            <Text style={styles.btnText}>{lev.level}/</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.header2}>
        {doubleList.map((lev) => (
          <TouchableOpacity key={lev.id} onPress={() => levelToggle(lev.level)}>
            <Text style={styles.btnText}>{lev.level}/</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <ScrollView>
          {songList.map((song) =>
            song.level === level ? (
              <TouchableOpacity
                key={song.img}
                onPress={() => Linking.openURL(song.url)}
              >
                <View style={styles.toDo}>
                  <Text style={styles.toDoText}>{song.title}</Text>
                </View>
              </TouchableOpacity>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  header2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnText: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
