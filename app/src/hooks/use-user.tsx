import { useEffect, useState } from "react"

type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	textCredits: number
	videoCredits: number
	token: string
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  return { user, setUser }
}
