import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { isEmpty } from "lodash";
import { useSession } from "~/components/Providers";

export default function AuthLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isEmpty(session)) {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
