import { useContext } from "react";
import { BoardCreateContext } from "../stores";

const useBoardCreate = () => {
  return useContext(BoardCreateContext)
}

export default useBoardCreate;