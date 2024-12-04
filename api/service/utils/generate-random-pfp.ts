import { micah } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"

export const generateRandomPfp = async () => {
  const avatar = createAvatar(micah, {
    randomizeIds: true,
    seed: Math.random().toString(),
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'f9e0ae', 'f4f4f4']
  })
  console.log(avatar.toDataUri())
  return avatar.toString()
}