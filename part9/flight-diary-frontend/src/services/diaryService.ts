import type { DiaryEntry } from "../types"
import axios from "axios";

const baseUrl = 'http://localhost:3000';

const getAll = async () => {

  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`)
  return response.data
}



export default { getAll }