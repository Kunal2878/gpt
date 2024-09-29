import { AnyNode } from "postcss";

export interface Message {
    mail:string
    content: string
    room_name:string
    time:string

}

export interface Message2 {
 info: {
    mail:string
    content: string;
    room_name:string

  }

  }
  export interface Namespace{
    chat_message:string
  }
  export interface AppContextProps {
    userName: string | undefined;
    email: string|undefined;
    id: AnyNode|undefined;
    title: string;
    avatar: string|undefined;
    isSession: boolean;
    isLoading:boolean;
    isNotify:boolean;
    isLogin:boolean;


    isThemeMenu:boolean;
    isInvite:boolean;
    chatTheme:string;
    isMenuOpen:boolean;
    setUserName: (userName: string|undefined) => void;
    setEmail: (email: string|undefined) => void;
    setId: (id: any|undefined) => void;
    setTitle: (title: string) => void;
    setAvatar: (avatar: string|undefined) => void;
    setIsSession: (isSession: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsNotify: (isNotify: boolean) => void;
    setIsLogin: (isLogin: boolean) => void;
    setIsThemeMenu: (isThemeMenu: boolean) => void;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    setIsInvite: (isInvite: boolean) => void;
    setChatTheme: (chatTheme: string) => void;

    
  }
 