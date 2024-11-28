import { Space, SpaceResSchema, SpaceResType } from "@/types/space"
import axios from "axios"

const url = "http://localhost:3000/v1"

export const createSpace = async (data: Space) => {
  const spacePayload: SpaceResType = await SpaceResSchema.parseAsync({
    ...data,
    listQuestion: data.listQuestion.map((que) => que.question),
  })

  const res = await axios.post(url + '/spaces', spacePayload, {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return res
} 