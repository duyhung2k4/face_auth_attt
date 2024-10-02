import { createContext } from 'react'
import AppRouter from './router'



function App() {
  return (
    <RootContact.Provider
        value={{
            ART_PIXEL_BE: "http://localhost:10001",
            ART_PIXEL_SOCKET: "ws://localhost:8080/socket/v1"
        }}
    >
        <AppRouter/>
    </RootContact.Provider>
  )
}

export const RootContact = createContext<RootContactType>({
    ART_PIXEL_BE: "",
    ART_PIXEL_SOCKET: "",
})

export type RootContactType = {
    ART_PIXEL_BE: string
    ART_PIXEL_SOCKET: string
}

export default App
