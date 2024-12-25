"use client"
import { useState, createContext, useContext } from "react"
import { ThemeProvider } from "next-themes"
import {store} from './store/state'
import { Provider } from 'react-redux';
// const AppContext = createContext<AppContextProps|null>(null);
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { useEffect } from 'react';
import {AppContextProps} from './types/basic_types'
const AppContext = createContext<AppContextProps|null>(null);

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID ?? '',
    // signUpVerificationMethod: 'code'
  }
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);
type c_msg ={
  prmt: string;
  content: any;
}
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<any|undefined>("");
  const [email, setEmail] = useState<string|undefined>("");
  const [userName, setUserName] = useState<string|undefined>("");
  const [title, setTitle] = useState<string>("");
  const [avatar, setAvatar] = useState<string|undefined>("/user.svg");
  const [isSession, setIsSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotify, setIsNotify] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAvatarMenu, setIsAvatarMenu] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const [chatRooms, setChatRooms] = useState<any>([]);
  const [showError, setShowError]= useState<string>('')
  const [content, setContent] = useState<any>([])
  const [newContent, setNewContent] = useState<any>([])
  const [chatRoomData, setChatRoomData]= useState<any>([])

  const [isThemeMenu, setIsThemeMenu] = useState<boolean>(false);
  const [isInvite, setIsInvite] = useState<boolean>(false);
  const [chatTheme, setChatTheme] = useState<string>('/Design.png');
  const [currRid,setCurrRid]=useState<string | undefined>('')
  const [currIndex,setCurrIndex]=useState<number>(0)
  const [quickPrompt,setQuickPrompt]=useState<string>('')



  

  return (
    <Provider store={store}>
      <AppContext.Provider
        value={{
          userName,
          email,
          id,
          title,
          avatar,
          isSession,
          isLoading,
          isNotify,
          isLogin,
          isInvite,
          isThemeMenu,
          chatTheme,
          isMenuOpen,
          isAvatarMenu,
          files,
          showError,
          chatRooms,
          content,
          newContent,
          chatRoomData,
          currRid,
          currIndex,
          quickPrompt,

          setId,
          setEmail,
          setUserName,
          setTitle,
          setAvatar,
          setIsSession,
          setIsLoading,
          setIsNotify,
          setIsLogin,
          setIsThemeMenu,
          setChatTheme,
          setIsInvite,
          setIsMenuOpen,
          setIsAvatarMenu,
          setFiles,
          setShowError,
          setChatRooms,
          setContent,
          setNewContent,
          setChatRoomData,
          setCurrRid,
          setCurrIndex,
          setQuickPrompt

        }}
      >

        {children}
      </AppContext.Provider>
     

    </Provider>
  );

}


    
export  function UseAppContext():AppContextProps | null {
    return (useContext(AppContext));
}