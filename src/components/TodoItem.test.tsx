import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { TodoItem } from "./TodoItem"

test("todo item", async () => {
  const element = { completed: false, id: 3, title: "tes", userId: 3 }
  const { asFragment } = render(
    <Provider store={store}>
      <TodoItem item={element} />
    </Provider>,
  )

  expect(asFragment).toMatchSnapshot()
})
