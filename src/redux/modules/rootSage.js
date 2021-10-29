import { all } from "@redux-saga/core/effects";
import { usersSage } from "./users";

export default function* rootSage(){
  yield all([usersSage()])
}