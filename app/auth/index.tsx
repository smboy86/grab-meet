// 만들어줘 기본 화면 react native
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "~/components/ui/input";
import { supabase } from "~/utils/supabase";

export default function App() {
  // const navigation = useNavigation();
  const router = useRouter();
  const { name } = useLocalSearchParams<{
    name: string;
  }>();

  const [value, setValue] = useState("");
  const [data, setData] = useState<any[]>([]);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("test").select();

      try {
        if (error) {
          console.error(error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.log("eerrrrr   ", error);
      }
    };

    fetchData();
  }, []);

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
        <Text>
          data :::
          {data?.map((item) => {
            return <Text key={item.id}>{item.name}</Text>;
          })}
        </Text>
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
