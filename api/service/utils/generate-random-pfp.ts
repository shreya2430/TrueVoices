import { micah } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"

export const generateRandomPfp = async (name: string) => {
  const avatar = createAvatar(micah, {
    randomizeIds: true,
    seed: name,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'f9e0ae', 'f4f4f4']
  })
  return avatar.toDataUri()
}