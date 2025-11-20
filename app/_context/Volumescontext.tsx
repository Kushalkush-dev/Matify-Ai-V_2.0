import { createContext } from "react";

interface TEAM {
  createdBy: String,
  title: String,
  _id: String
}


export const Volumescontext=createContext<any>(undefined)


export const ActiveChapter=createContext<TEAM|any>({})




