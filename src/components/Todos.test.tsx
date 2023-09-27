import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../app/store"
import Todos from "./Todos"

test("todos", async () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Todos />
    </Provider>,
  )

  expect(asFragment).toMatchSnapshot()
})
