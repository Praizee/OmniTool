import { generatePassword } from "@/utils/passwordGen";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Snackbar,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import tw from "twrnc";

export default function PasswordScreen() {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleGenerate = () => {
    const newPass = generatePassword({
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    });
    setPassword(newPass);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const copyToClipboard = async () => {
    if (!password) return;
    await Clipboard.setStringAsync(password);
    setSnackbarVisible(true);
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Card style={tw`p-6 mb-6`} mode="elevated">
        <Text style={tw`text-3xl text-center font-mono mb-6`} selectable>
          {password || "Click Generate"}
        </Text>
        <Button
          mode="contained-tonal"
          icon="content-copy"
          onPress={copyToClipboard}
          style={tw`self-center`}
        >
          Copy Password
        </Button>
      </Card>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={tw`p-4 mb-6`} mode="elevated">
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-lg font-bold`}>Length: {length}</Text>
            <View style={tw`flex-row items-center`}>
              <IconButton
                icon="minus"
                mode="contained-tonal"
                onPress={() => setLength(Math.max(6, length - 1))}
              />
              <IconButton
                icon="plus"
                mode="contained-tonal"
                onPress={() => setLength(Math.min(32, length + 1))}
              />
            </View>
          </View>

          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-base font-medium`}>Include Uppercase</Text>
            <Switch
              value={includeUppercase}
              onValueChange={setIncludeUppercase}
              color={theme.colors.primary}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-base font-medium`}>Include Numbers</Text>
            <Switch
              value={includeNumbers}
              onValueChange={setIncludeNumbers}
              color={theme.colors.primary}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-base font-medium`}>Include Symbols</Text>
            <Switch
              value={includeSymbols}
              onValueChange={setIncludeSymbols}
              color={theme.colors.primary}
            />
          </View>
        </Card>

        <Button mode="contained" onPress={handleGenerate} style={tw`py-2 mb-8`}>
          Generate New Password
        </Button>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Password copied to clipboard!
      </Snackbar>
    </View>
  );
}

