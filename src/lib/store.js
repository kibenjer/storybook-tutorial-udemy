import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const defaultTask = [
  { id: "1", title: "something 1", state: "TASK_INBOX" },
  { id: "2", title: "something 2", state: "TASK_INBOX" },
  { id: "3", title: "something 3", state: "TASK_INBOX" },
  { id: "4", title: "something 4", state: "TASK_INBOX" },
];

const TaskBoxData = {
  tasks: defaultTask,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();
  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));

  return result;
});

export const TaskSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      console.log(`task = ${task}`);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tasks = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = "failed";
      state.error = "Something went wrong...";
      state.tasks = [];
    });
  },
});

export const { updateTaskState } = TaskSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: TaskSlice.reducer,
  },
});

export default store;
