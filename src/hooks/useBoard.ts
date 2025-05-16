import { useContext } from "react";
import { NetworkBoardStateContext } from "../context/NetworkBoardStateContext";

export const useBoardState = () => useContext(NetworkBoardStateContext)
