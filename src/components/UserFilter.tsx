import styled from "styled-components"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { selectUsers, selectSelectedUser } from "../api/todoSlice"
import { selectUser } from "../api/todoSlice"
import "react-dropdown/style.css"

const ItemWrapper = styled.section`
  display: flex;
  gap: 5px;
  padding-left: 5px;
`
const UserItem = styled.div`
  padding: 2px;
  &.selected {
    border: 2px solid darkgray;
    background-color: lightgray;
  }
`

export const UserFilter = () => {
  const users = useAppSelector(selectUsers)
  const selectedUser = useAppSelector(selectSelectedUser)
  const dispatch = useAppDispatch()

  return (
    <>
      Filtrera på användare
      <ItemWrapper>
        <UserItem
          className={selectedUser === -1 ? "selected" : ""}
          key="all"
          onClick={() => dispatch(selectUser(-1))}
        >
          Alla
        </UserItem>
        {users.map((user) => {
          return (
            <UserItem
              className={selectedUser === user ? "selected" : ""}
              key={user}
              onClick={() => dispatch(selectUser(user))}
            >
              {user}
            </UserItem>
          )
        })}
      </ItemWrapper>
    </>
  )
}
