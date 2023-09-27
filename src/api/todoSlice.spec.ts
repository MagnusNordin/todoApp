import todoReducer, {
  TodoState,
  incrementPage,
  decrementPage,
  setPaginationSize,
  selectUser,
  completeTodo,
  removeTodo,
  todoAsync,
} from "./todoSlice"

describe("todo reducer", () => {
  const initialState: TodoState = {
    selectedUser: -1,
    pagination: { current: 1, size: 10, total: 30 },
    todos: [
      {
        userId: 1,
        id: 4,
        title: "et porro tempora",
        completed: true,
      },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
      {
        userId: 2,
        id: 6,
        title: "qui ullam ratione quibusdam voluptatem quia omnis",
        completed: false,
      },
    ],
    users: [],
  }
  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual({
      selectedUser: -1,
      pagination: { current: 0, size: 10, total: 0 },
      todos: [],
      users: [],
    })
  })

  it("should handle increment", () => {
    const actual = todoReducer(initialState, incrementPage())
    expect(actual.pagination.current).toEqual(2)
  })

  it("should handle increment but no increase if at the end", () => {
    const endState: TodoState = {
      selectedUser: -1,
      pagination: { current: 2, size: 10, total: 20 },
      todos: [],
      users: [],
    }
    const actual = todoReducer(initialState, incrementPage())
    expect(actual.pagination.current).toEqual(2)
  })

  it("should handle decrement", () => {
    const actual = todoReducer(initialState, decrementPage())
    expect(actual.pagination.current).toEqual(0)
  })
  it("should handle decrement but not below zero", () => {
    const zeroState: TodoState = {
      selectedUser: -1,
      pagination: { current: 0, size: 10, total: 20 },
      todos: [],
      users: [],
    }
    const actual = todoReducer(initialState, decrementPage())
    expect(actual.pagination.current).toEqual(0)
  })
  it("should handle setPaginationSize", () => {
    const actual = todoReducer(initialState, setPaginationSize(2))
    expect(actual.pagination.size).toEqual(2)
  })
  it("should handle selectUser", () => {
    const actual = todoReducer(initialState, selectUser(2))
    expect(actual.pagination.total).toEqual(1)
    expect(actual.pagination.current).toEqual(0)
    expect(actual.selectedUser).toEqual(2)
  })
  it("should handle completeTodo", () => {
    const actual = todoReducer(
      initialState,
      completeTodo({
        id: 5,
        completed: true,
      }),
    )
    const todo = actual.todos.find((todo) => todo.id === 5)
    expect(todo?.completed).toEqual(true)
  })
  it("should handle removeTodo", () => {
    const actual = todoReducer(initialState, removeTodo(5))
    expect(actual.todos.length).toEqual(2)
  })
})

describe("todo sync", () => {
  it("should received correctly", async () => {
    const initialState: TodoState = {
      selectedUser: -1,
      pagination: { current: 1, size: 10, total: 30 },
      todos: [],
      users: [],
    }
    const action = todoAsync.fulfilled(
      JSON.stringify([
        {
          userId: 1,
          id: 5,
          title: "test todo",
          completed: false,
        },
      ]),
      "",
    )

    const actual = todoReducer(initialState, action)
    expect(actual.todos.length).toEqual(1)
    expect(actual.todos[0].id).toEqual(5)
  })
})
