import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { supabase } from "~/utils/supabase";
import { User as SupabaseUser } from "@supabase/auth-js"; // supabase User 타입 임포트

interface User {
  id: string;
  email: string | undefined;
  // 필요한 다른 속성들 추가
}

interface Session {
  // 필요한 속성들 추가
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<SupabaseUser | null>(null);

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      data.user;
      setUser(data.user); // user 객체만 추출하여 setUser에 전달
    }
  };

  const signUpWithEmail = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      setUser(data.user); // user 객체만 추출하여 setUser에 전달
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      setUser(null);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome, {user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Sign In" onPress={signInWithEmail} />
          <Button title="Sign Up" onPress={signUpWithEmail} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
