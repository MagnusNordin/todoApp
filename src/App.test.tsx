import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"

test("renders learn react link", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(asFragment).toMatchSnapshot()
})
