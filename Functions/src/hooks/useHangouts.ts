import { useContext } from "react";
import {
  HangoutsContext,
  type HangoutsContextValue,
} from "../providers/HangoutsProvider";

export function useHangouts(): HangoutsContextValue {
  const context = useContext(HangoutsContext);
  if (!context) {
    throw new Error("useHangouts must be used inside a HangoutsProvider");
  }
  return context;
}