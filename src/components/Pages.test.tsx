import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { Pages } from "./Pages"

test("pages", async () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Pages />
    </Provider>,
  )

  expect(asFragment).toMatchSnapshot()
})
