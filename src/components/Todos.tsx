import { useAppSelector } from "../app/hooks"
import {
  selectPagimation,
  selectTodos,
  selectSelectedUser,
} from "../api/todoSlice"
import styled from "styled-components"

import { TodoItem } from "./TodoItem"

const TodoWrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const HeaderItem = styled.div`
  margin: 0 50px;
`
export default function Todos() {
  const todos = useAppSelector(selectTodos)
  const pagination = useAppSelector(selectPagimation)
  const selectedUser = useAppSelector(selectSelectedUser)

  if (!todos) {
    return <>Laddar...</>
  }

  const userFilteredTodos =
    selectedUser >= 0
      ? todos.filter((todo) => todo.userId === selectedUser)
      : todos
  const filteredTodos = userFilteredTodos.slice(
    pagination.current * pagination.size,
    pagination.current * pagination.size + pagination.size,
  )
  return (
    <>
      <Header>
        <HeaderItem>Att göra</HeaderItem>
        <HeaderItem>Användare</HeaderItem>
      </Header>
      <TodoWrapper>
        {filteredTodos.map((element) => {
          return <TodoItem key={element.id} item={element} />
        })}
      </TodoWrapper>
    </>
  )
}
