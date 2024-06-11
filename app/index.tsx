import openDB from "../db";
import { Tasks } from "@/components/Tasks";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TasksProps {
  id: number;
  name: string;
  isCompleted: boolean;
}

const db = openDB();

export default function HomeScreen() {
  const [task, setTask] = useState<TasksProps | null>(null);
  const [taskItems, setTaskItems] = useState<TasksProps[]>([]);

  async function handleAddTask() {
    if (task) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  }

  function handleDelTask(id: number) {
    const itemsCopy = taskItems.filter((item) => item.id !== id);
    setTaskItems(itemsCopy);
  }

  useEffect(() => {
    const rows = db.getAllSync("select * from tasks", []);

    return;
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Daily Tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleDelTask(item.id)}
              >
                <Tasks text={item.name} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Write a task here!"
            value={task ? task.name : ""}
            onChangeText={(text) =>
              setTask({ id: Date.now(), name: text, isCompleted: false })
            }
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
    padding: 10,
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    padding: 10,
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
