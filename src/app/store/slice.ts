import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Const arrays instead of interfaces
type  Rooms={
room_id:string|undefined,
last_prompt:string|undefined
}


type Message ={
  room_id:string,
  msg_id:string,
  prmt:string,
  des:string
}


export interface ChatState{
  rooms:Rooms[],
  messages:Message[],
  allRoomData:Message[],
  activeRoomId:string
  prompt:string,
  isMenu:boolean,
  isLogin:boolean,
  isAvatarMenu:boolean,
  avatar:string,
  userName:string,
  email:string,
  files:File[],
  showError:string

}
const initialState:ChatState ={
  rooms:[],
  messages:[],
  allRoomData:[],
  activeRoomId:'ttthgghcfgcccccvcv',
  prompt:'',
  isMenu:false,
  isLogin:false,
  isAvatarMenu:false,
  avatar:'',
  userName:'',
  email:'',
  files:[],
  showError:''

}
// Create the Redux store
const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Add a new room
    addRoom: (state, action: PayloadAction<Rooms>) => {
      state.rooms.push(action.payload);
    },        
    // Remove a room
    // removeRoom: (state, action: PayloadAction<string>) => {
    //   return state.rooms.filter((room) => room.room_id !== action.payload);
    // },
    
    // Update last prompt
    updateLastPrompt: (state, action: PayloadAction<{ room_id: string, last_prompt: string }>) => {
      const index = state.rooms.findIndex((r: Rooms) => r.room_id === action.payload.room_id);
      if (index !== -1) {
        state.rooms[index].last_prompt = action.payload.last_prompt;
      }
    },

    addMessage: (state, action: PayloadAction<Message>) => {
     
      state.messages.push(action.payload);
    },

    setActiveRoom: (state, action: PayloadAction<string>) => {
     state.activeRoomId = action.payload;
    },
    setActivPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.isMenu = action.payload;
    },
    setIsAvatarMenu: (state, action: PayloadAction<boolean>) => {
      state.isAvatarMenu = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFiles: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    setRemoveFile: (state, action: PayloadAction<number>) => {
      state.files.splice(action.payload, 1);
    },
    setShowError: (state, action: PayloadAction<string>) => {
      state.showError = action.payload;
    },
  }
})    
    // export const messageSlice= createSlice({
    //   name: 'Messages',
    //   initialState: messages,
    //   reducers: {
    //     // Add a new message
    //     addMessage: (state: Message[], action: PayloadAction<{ room_id: string, msg_id: string, prmt: string, des: string }>) => {
    //       const newMessage: Message = {
    //         room_id: action.payload.room_id,
    //         msg_id: action.payload.msg_id,
    //         prmt: action.payload.prmt,
    //         des: action.payload.des,
    //       };
    //       state.push(newMessage);
    //     },
        
    //     // Remove messages for a specific room
    //     removeRoomMessages: (state: Message[], action: PayloadAction<string>) => {
    //       return state.filter((msg: Message) => msg.room_id !== action.payload);
    //     }
    //   }
    // })
    
    // export const activeRoomSlice = createSlice({
    //   name: 'ActiveRoom',
    //   initialState: activeRoomId,
    //   reducers: {
    //     // Set active room
    //     setActiveRoom: (state: string, action: PayloadAction<string>) => {
    //       return action.payload;
    //     }
    //   }
    // })

    // export const promptSlice= createSlice({
    //   name: 'SetPrompt',
    //   initialState: prompt,
    //   reducers: {
    //     // Set active room
    //     setActivPrompt: (state: string, action: PayloadAction<string>) => {
    //       return action.payload;
    //     }
    //   }
    // })
  


// Export action creators
export const { 
  addRoom,
  addMessage,
  setActiveRoom,
  setActivPrompt,
  updateLastPrompt,
  setMenu,
  setIsAvatarMenu,
  setIsLogin,
  setAvatar,
  setUsername,
  setEmail,
  setFiles,
  setRemoveFile,
  setShowError
  // removeRoom, 
  // removeRoomMessages


} = roomSlice.actions
  
export default roomSlice.reducer

