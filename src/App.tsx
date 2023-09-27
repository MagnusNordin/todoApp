import { useDispatch } from "react-redux"
import styled from "styled-components"
import { todoAsync } from "./api/todoSlice"
import Todos from "./components/Todos"
import { Pages } from "./components/Pages"
import { UserFilter } from "./components/UserFilter"

import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
`
const AppWrapper = styled.div`
  text-align: left;
`

const AppMain = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

function App() {
  const dispatch = useDispatch<any>()
  dispatch(todoAsync())

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <AppMain>
          <UserFilter />
          <Todos />
          <Pages />
        </AppMain>
      </AppWrapper>
    </>
  )
}

export default App
