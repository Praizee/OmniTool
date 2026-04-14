import { Task, useTasks } from "@/hooks/useTasks";
import React, { useState } from "react";
import { Alert, FlatList, Keyboard, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import tw from "twrnc";

export default function TasksScreen() {
  const theme = useTheme();
  const { tasks, addTask, toggleTask, editTask, deleteTask } = useTasks();
  const [inputText, setInputText] = useState("");

  // Edit Modal State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editInputText, setEditInputText] = useState("");

  const handleAdd = () => {
    addTask(inputText);
    setInputText("");
    Keyboard.dismiss();
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setEditInputText(task.title);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (taskToEdit) {
      editTask(taskToEdit.id, editInputText);
    }
    setEditModalVisible(false);
    setTaskToEdit(null);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTask(id) },
      ],
    );
  };

  return (
    <View style={tw`flex-1 p-4`}>
      {/* Input Section */}
      <View style={tw`flex-row items-center mb-6`}>
        <TextInput
          label="Add a new task..."
          value={inputText}
          onChangeText={setInputText}
          mode="outlined"
          style={tw`flex-1 mr-2`}
          onSubmitEditing={handleAdd}
        />
        <IconButton
          icon="plus"
          mode="contained"
          size={30}
          onPress={handleAdd}
          disabled={!inputText.trim()}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={tw`mb-3`} mode="elevated">
            <View style={tw`flex-row items-center justify-between p-2`}>
              <View style={tw`flex-row items-center flex-1`}>
                <Checkbox
                  status={item.completed ? "checked" : "unchecked"}
                  onPress={() => toggleTask(item.id)}
                  color={theme.colors.primary}
                />
                <Text
                  style={tw`text-base ml-2 flex-1 ${item.completed ? "line-through text-gray-500" : ""}`}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => openEditModal(item)}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  iconColor="#ef4444"
                  onPress={() => confirmDelete(item.id)}
                />
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-10`}>
            No tasks yet. Add one above!
          </Text>
        }
      />

      {/* Edit Task Dialog */}
      <Portal>
        <Dialog
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
        >
          <Dialog.Title>Edit Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={editInputText}
              onChangeText={setEditInputText}
              mode="outlined"
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditModalVisible(false)}>Cancel</Button>
            <Button onPress={handleSaveEdit}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

