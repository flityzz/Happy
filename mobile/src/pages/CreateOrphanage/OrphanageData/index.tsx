import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from '../../../services/api'

import * as ImagePicker from "expo-image-picker";

interface OrphanageDataParams {
  position: {
    latitude: string;
    longitude: string;
  }
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const params = route.params as OrphanageDataParams;

  const [open_on_weekends, setOpen_on_weekends] = useState(true);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpening_hours] = useState("");
  const [images, setImages] = useState<string[]>([]);

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position
    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach((image, index) => {
      data.append("images", {
        name: `imaga_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post("orphanages", data);
    alert("Cadastro realizado com sucesso");
    navigation.navigate('OrphanageMap')
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status != "granted") {
      alert("precisamos de permissão para acessar suas fotos");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => setAbout(text)}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {images.map((img) => {
          return (
            <Image
              key={img}
              source={{ uri: img }}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImage}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={(text) => setOpening_hours(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={open_on_weekends}
          onValueChange={(value) => setOpen_on_weekends(value)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  uploadedImagesContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    height: 64,
    width: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default OrphanageData;
