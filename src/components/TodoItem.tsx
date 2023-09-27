import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import { completeTodo, removeTodo } from "../api/todoSlice"

import { Todo } from "../types/Todo"

type TodoItemProps = {
  item: Todo
}

const CompletedItem = styled.div`
  flex: 0 0 24px;
`
const ItemTitle = styled.div`
  text-align: left;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ItemWrapper = styled.section`
  display: flex;
  gap: 5px;
  padding-left: 5px;
  height: 40px;
`

const ItemUser = styled.div`
  margin-right: 10px;
`
export const TodoItem: FunctionComponent<TodoItemProps> = ({ item }) => {
  const dispatch = useAppDispatch()

  return (
    <ItemWrapper>
      {item.completed ? (
        <CompletedItem
          onClick={() =>
            dispatch(completeTodo({ id: item.id, completed: !item.completed }))
          }
        >
          &#9989;
        </CompletedItem>
      ) : (
        <CompletedItem
          onClick={() =>
            dispatch(completeTodo({ id: item.id, completed: !item.completed }))
          }
        >
          &#11093;
        </CompletedItem>
      )}
      <ItemTitle>{item.title}</ItemTitle>
      <ItemUser>{item.userId}</ItemUser>
      <div onClick={() => dispatch(removeTodo(item.id))}>&#x1F5D1;</div>
    </ItemWrapper>
  )
}
