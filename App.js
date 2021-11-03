import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  StatusBar,
} from "react-native";
import { theme } from "./color";
import db from "./data.json";

const songList = db.songs;
const singleList = db.Slevel;
const doubleList = db.Dlevel;

export default function App() {
  const [level, setLevel] = useState();
  const levelToggle = (lv) => setLevel(lv);
  const [searchTxt, setSearchTxt] = useState(songList);
  const onChangeText = (txt) => {
    const result = songList.filter((song) => song.title.match(txt));
    setSearchTxt(result);
  };

  return (
    <View style={styles.container}>
      <StatusBar color="white" />
      <View style={styles.header}>
        {singleList.map((lev) => (
          <TouchableOpacity key={lev.id} onPress={() => levelToggle(lev.level)}>
            <Text style={styles.btnText}>{lev.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.header2}>
        {doubleList.map((lev) => (
          <TouchableOpacity key={lev.id} onPress={() => levelToggle(lev.level)}>
            <Text style={styles.btnText}>{lev.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="제목을 한글 또는 영문으로 입력하세요"
        />
      </View>
      <ScrollView>
        <View>
          {searchTxt.map((song) =>
            song.level === level ? (
              <TouchableOpacity
                key={song.img}
                onPress={() => Linking.openURL(song.url)}
              >
                <View style={styles.toDo}>
                  <Image
                    style={{ width: 240, height: 130, borderRadius: 15 }}
                    source={{
                      uri: song.img,
                    }}
                  />
                  <Text style={styles.toDoText}>{song.title}</Text>
                </View>
              </TouchableOpacity>
            ) : null
          )}
        </View>
      </ScrollView>
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
    marginTop: 50,
  },
  header2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  btnText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  toDoText: {
    paddingTop: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
