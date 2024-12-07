import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) =>{
  return twMerge(clsx(inputs))
}

export const urlToFile = async (url: string, name?: string): Promise<File> => {
  try {
    const res = await axios.get(url, {
      responseType: 'arraybuffer'
    })
    const fileName = url.split('?')[0].split('/').pop() || 'file'
    const blob = new Blob([res.data], { type: res.headers['content-type'] })
    const file = new File([blob], name || decodeURIComponent(fileName), { type: res.headers['content-type'] })
    return file
  }
  catch (error) {
    console.log(error)
    return new File([], 'file')
  }
}