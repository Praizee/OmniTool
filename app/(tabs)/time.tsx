import { formatSwTime, formatTTime } from "@/utils/timeUtils";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";

export default function TimeScreen() {
  const [mode, setMode] = useState("stopwatch");

  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const swInterval = useRef<NodeJS.Timeout | null>(null);

  const [timerInput, setTimerInput] = useState("5");
  const [tTime, setTTime] = useState(300);
  const [tRunning, setTRunning] = useState(false);
  const tInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (swRunning) {
      swInterval.current = setInterval(
        () => setSwTime((prev) => prev + 10),
        10,
      );
    } else {
      clearInterval(swInterval.current as NodeJS.Timeout);
    }
    return () => clearInterval(swInterval.current as NodeJS.Timeout);
  }, [swRunning]);

  useEffect(() => {
    if (tRunning && tTime > 0) {
      tInterval.current = setInterval(() => setTTime((prev) => prev - 1), 1000);
    } else if (tTime === 0) {
      setTRunning(false);
      clearInterval(tInterval.current as NodeJS.Timeout);
    } else {
      clearInterval(tInterval.current as NodeJS.Timeout);
    }
    return () => clearInterval(tInterval.current as NodeJS.Timeout);
  }, [tRunning, tTime]);

  const startTimer = () => {
    if (!tRunning && tTime === 0) setTTime((parseInt(timerInput) || 0) * 60);
    setTRunning(true);
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <SegmentedButtons
        value={mode}
        onValueChange={setMode}
        buttons={[
          { value: "stopwatch", label: "Stopwatch" },
          { value: "timer", label: "Timer" },
        ]}
        style={tw`mb-8`}
      />

      <Card style={tw`p-8 items-center justify-center`} mode="elevated">
        {mode === "stopwatch" ? (
          <View style={tw`w-full items-center`}>
            <Text style={tw`text-6xl font-bold mb-8 font-mono`}>
              {formatSwTime(swTime)}
            </Text>
            <View style={tw`flex-row justify-center w-full px-4`}>
              <Button
                mode="contained"
                onPress={() => setSwRunning(!swRunning)}
                style={tw`flex-1 mr-2`}
                buttonColor={swRunning ? "#ef4444" : "#10b981"}
              >
                {swRunning ? "Pause" : "Start"}
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setSwRunning(false);
                  setSwTime(0);
                }}
                style={tw`flex-1 ml-2`}
              >
                <Text>Reset</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View style={tw`w-full items-center`}>
            <Text style={tw`text-6xl font-bold mb-6 font-mono`}>
              {formatTTime(tTime)}
            </Text>
            {!tRunning && (
              <TextInput
                label="Minutes"
                value={timerInput}
                onChangeText={(val) => {
                  setTimerInput(val);
                  setTTime((parseInt(val) || 0) * 60);
                }}
                keyboardType="numeric"
                mode="outlined"
                style={tw`w-3/4 mb-6 text-center`}
              />
            )}
            <View style={tw`flex-row justify-center w-full px-4`}>
              <Button
                mode="contained"
                onPress={tRunning ? () => setTRunning(false) : startTimer}
                style={tw`flex-1 mr-2`}
                buttonColor={tRunning ? "#ef4444" : "#8b5cf6"}
              >
                <Text>{tRunning ? "Pause" : "Start"}</Text>
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setTRunning(false);
                  setTTime((parseInt(timerInput) || 0) * 60);
                }}
                style={tw`flex-1 ml-2`}
              >
                <Text>Reset</Text>
              </Button>
            </View>
          </View>
        )}
      </Card>
    </View>
  );
}

