import { createContext } from 'react'

interface IAppState {
    baseURL: string
}

const initialState: IAppState = {
    baseURL: ''
}

export const AppStateContext = createContext<IAppState>(initialState)
