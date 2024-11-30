import { Space, SpaceResSchema, SpaceResType } from "@/types/space"
import axios from "axios"

const url = "http://localhost:3000/v1"

export const createSpace = async (data: Space) => {
  const profilePic = await uploadFile(data.spaceLogo, `/upload/${data.spaceName}/image`)
  const thankYouPageImage = await uploadFile(data.thankYouPage.image, `/upload/${data.spaceName}/gif`)


  const spacePayload: SpaceResType = await SpaceResSchema.parseAsync({
    ...data,
    spaceLogo: profilePic,
    thankYouPage: {
      ...data.thankYouPage,
      image: thankYouPageImage
    },
    listQuestion: data.listQuestion.map((que) => que.question),
  })

  const res = await axios.post(url + '/spaces', spacePayload, {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return res
} 

const uploadFile = async (file: File | undefined, path: string) => {
  const formData = new FormData()
  if (!file) {
    return ''
  }
  formData.append('file', file)
  const res = await axios.post(url + path, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}