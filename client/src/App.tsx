import React, { useState } from 'react';
import { Auth } from './views/Auth';
import { Main } from './views/Main';
import { BrowserRouter } from 'react-router-dom'
import { ContextProps } from './pages/contextInterFace';

export const Context = React.createContext<Partial<ContextProps>>({})

const App: React.FC = () => {
  const [ togg, setToggle] = useState<number>(0)
  const [tog, toggler] = useState<number>(0)
  const setToken = (token: string): void => {
    localStorage.setItem('token', token)
    setToggle(state => state + 1)
  }
  const getToken = (): string | false => {
    if (localStorage.getItem('token') === null) {
      return false
    }
    return localStorage.getItem('token')!
  }
  const removeToken = (): void => {
    localStorage.removeItem('token')
    setToggle(state => state + 1)
  }
  const setUserType = (usertype: string): void => {
    localStorage.setItem('usertype', usertype)
    setToggle(state => state + 1)
  }
  const getUserType = (): string => {
    return localStorage.getItem('usertype')!
  }
  const removeUserType = (): void => {
    localStorage.removeItem('usertype')!
    setToggle(state => state + 1)
  }

  const token = getToken()

  return (
    <BrowserRouter>
      <Context.Provider 
        value={{
          toggler,
          tog,
          setToken,
          removeToken,
          setUserType,
          getUserType,
          removeUserType,
          getToken
        }}
      >
      <div className="App" key={togg}>
        { token ? <Main /> : <Auth /> }
      </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export { App }

