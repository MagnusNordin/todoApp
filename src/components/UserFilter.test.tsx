import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { UserFilter } from "./UserFilter"

test("UserFilter", async () => {
  const { asFragment } = render(
    <Provider store={store}>
      <UserFilter />
    </Provider>,
  )

  expect(asFragment).toMatchSnapshot()
})
