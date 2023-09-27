import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { fetchTodos } from "./todoAPI"
import { Todo } from "../types/Todo"
import { Pagination } from "../types/Pagination"

export interface TodoState {
  selectedUser: number
  pagination: Pagination
  todos: Todo[]
  users: number[]
}

export interface CompleteAction {
  id: number
  completed: boolean
}

export const initialState: TodoState = {
  selectedUser: -1,
  pagination: { current: 0, size: 10, total: 0 },
  todos: [],
  users: [],
}

export const todoAsync = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetchTodos()
  return response.text()
})

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    incrementPage: (state) => {
      //check if next increment will go past the end
      if (
        (state.pagination.current + 1) * state.pagination.size <
        state.pagination.total
      ) {
        state.pagination.current += 1
      }
    },
    decrementPage: (state) => {
      if (state.pagination.current > 0) {
        state.pagination.current -= 1
      }
    },
    setPaginationSize: (state, action: PayloadAction<number>) => {
      state.pagination.size = action.payload
    },
    selectUser: (state, action: PayloadAction<number>) => {
      state.selectedUser = action.payload
      //reset pagination
      state.pagination.current = 0
      //set correct total for pagination
      state.pagination.total =
        state.selectedUser >= 0
          ? state.todos.filter((todo) => todo.userId === state.selectedUser)
              .length
          : state.todos.length
    },
    completeTodo: (state, action: PayloadAction<CompleteAction>) => {
      const item = state.todos.find((item) => item.id === action.payload.id)
      if (item) {
        item.completed = action.payload.completed
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex(
        (element) => element.id === action.payload,
      )
      if (index >= 0) {
        state.todos.splice(index, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(todoAsync.fulfilled, (state, action) => {
      state.todos = JSON.parse(action.payload)
      //save all available users
      state.users = state.todos.reduce((result, current) => {
        if (!result.find((item) => item === current.userId)) {
          result.push(current.userId)
        }
        return result
      }, [] as number[])
      state.pagination.total = state.todos.length
    })
  },
})

export const {
  incrementPage,
  decrementPage,
  setPaginationSize,
  selectUser,
  completeTodo,
  removeTodo,
} = todoSlice.actions

export const selectSelectedUser = (state: RootState) => state.todo.selectedUser
export const selectTodos = (state: RootState) => state.todo.todos
export const selectUsers = (state: RootState) => state.todo.users
export const selectPagimation = (state: RootState) => state.todo.pagination

export default todoSlice.reducer
