import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import {
  decrementPage,
  incrementPage,
  setPaginationSize,
} from "../api/todoSlice"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

const ItemWrapper = styled.section`
  display: flex;
  gap: 5px;
  padding-left: 5px;
  height: 24px;
  .Dropdown-root {
    font-size: 20px;
  }
`
const PageItem = styled.div`
  flex: 0 0 24px;
`

export const Pages = () => {
  const dispatch = useAppDispatch()

  const options = ["10", "20", "30"]
  const defaultOption = options[0]

  const onSelect = (value: any) => {
    console.log(value)
    const newSize: number = +value.value
    dispatch(setPaginationSize(newSize))
  }
  return (
    <ItemWrapper>
      <PageItem onClick={() => dispatch(decrementPage())}>&#x23EA;</PageItem>
      <Dropdown
        options={options}
        onChange={onSelect}
        value={defaultOption}
        placeholder=""
      />

      <PageItem onClick={() => dispatch(incrementPage())}>&#x23E9;</PageItem>
    </ItemWrapper>
  )
}
