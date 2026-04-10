import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  Button,
  Card,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import tw from "twrnc";
import { ConversionType, convertValue } from "../../utils/converter";

const units = {
  Length: ["Meters", "Kilometers", "Centimeters", "Miles", "Feet"],
  Weight: ["Kilograms", "Grams", "Pounds", "Ounces"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  Currency: ["USD", "EUR", "GBP", "NGN"],
};

export default function ConverterScreen() {
  const theme = useTheme();
  const [type, setType] = useState<ConversionType>("Length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Kilometers");
  const [result, setResult] = useState("");

  useEffect(() => {
    setFromUnit(units[type][0]);
    setToUnit(units[type][1]);
  }, [type]);

  useEffect(() => {
    if (inputValue) {
      const res = convertValue(inputValue, type, fromUnit, toUnit);
      setResult(res);
    } else {
      setResult("");
    }
  }, [inputValue, type, fromUnit, toUnit]);

  return (
    <ScrollView style={tw`flex-1 p-4`} keyboardShouldPersistTaps="handled">
      <SegmentedButtons
        value={type}
        onValueChange={(val) => setType(val as ConversionType)}
        buttons={[
          { value: "Length", label: "Length" },
          { value: "Weight", label: "Weight" },
          { value: "Temperature", label: "Temp" },
          { value: "Currency", label: "Currency" },
        ]}
        style={tw`mb-6`}
      />

      <Card style={tw`p-4 mb-4`} mode="elevated">
        <TextInput
          label={`From (${fromUnit})`}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          mode="outlined"
          style={tw`mb-4`}
        />

        <Text style={tw`text-sm font-bold text-gray-500 mb-2`}>
          Select From Unit:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mb-2 flex-row`}
        >
          {units[type].map((u) => (
            <Button
              key={`from-${u}`}
              mode={fromUnit === u ? "contained" : "outlined"}
              onPress={() => setFromUnit(u)}
              style={tw`mr-2`}
            >
              {u}
            </Button>
          ))}
        </ScrollView>
      </Card>

      <Card style={tw`p-4 mb-8`} mode="elevated">
        <Text style={tw`text-lg font-bold text-center mb-2 text-gray-500`}>
          Result ({toUnit})
        </Text>
        <Text style={tw`text-4xl font-bold text-center mb-6`}>
          {result || "0"}
        </Text>

        <Text style={tw`text-sm font-bold text-gray-500 mb-2`}>
          Select To Unit:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`flex-row`}
        >
          {units[type].map((u) => (
            <Button
              key={`to-${u}`}
              mode={toUnit === u ? "contained" : "outlined"}
              onPress={() => setToUnit(u)}
              style={tw`mr-2`}
            >
              {u}
            </Button>
          ))}
        </ScrollView>
      </Card>
    </ScrollView>
  );
}

