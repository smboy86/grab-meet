// 만들어줘 기본 화면 react native
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "~/components/ui/input";

export default function App() {
  // const navigation = useNavigation();
  const router = useRouter();
  const { name } = useLocalSearchParams<{
    name: string;
  }>();

  const [value, setValue] = React.useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi</Text>
      <Text style={styles.text}>{name}</Text>
      <View className="flex w-full p-5">
        <Input
          placeholder="뭘좀 적어봐.."
          value={value}
          onChangeText={onChangeText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
        <Text>ssss</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
