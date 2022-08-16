import React from 'react'
import { createStore, TStore } from './createStore'
import { useLocalObservable } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0

const storeContext = React.createContext<TStore | null>(null)

export const UIStoreProvider = ({ children }: { children: React.ReactNode}) => {
  const store = useLocalObservable(createStore);
  return (<storeContext.Provider value={store}>{children}</storeContext.Provider>);
}

export const useUIStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useUIStore must be used within a StoreProvider.')
  }
  return store
}