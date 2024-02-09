import { createContext } from 'react'

type UserContextType = {
    location: any,
    setLocation: React.Dispatch<React.SetStateAction<any>>,
    
}

export const UserContext = createContext<UserContextType>(null)