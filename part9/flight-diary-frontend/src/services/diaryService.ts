import type { DiaryEntry, NewDiaryEntry } from "../types"
import axios from "axios";

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

const create = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary)
  return response.data
}


export default { getAll, create }