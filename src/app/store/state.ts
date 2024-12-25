import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import chatReducer from './slice'
export const store = configureStore({
  reducer: {
    chat:chatReducer,

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch









// Const arrays instead of interfaces
// type Room={
// room_id:string,
// last_prompt:string


// }

// type Message ={
//   room_id:string,
//   msg_id:string,
//   prmt:string,
//   des:string
// }



// const rooms: any = [];
// const messages:any = [];
// const allRoomData:any=[]
// const roomNames:any=[]
// let activeRoomId:any = '';
// let prompt:any = ''

// // Create the Redux store
// const store = configureStore({
//   reducer: {
//     rooms: createSlice({
//       name: 'rooms',
//       initialState: rooms,
//       reducers: {
//         // Add a new room
//         addRoom: (state: Room[], action: PayloadAction<string>) => {
//           const rm_id: string = new Date().toISOString()
//           activeRoomId = rm_id
//           const newRoom: Room = {
//             room_id: rm_id,
//             last_prompt: action.payload || 'New-chat',
//           };
//           state.push(newRoom);
//         },
        
//         // Remove a room
//         removeRoom: (state: Room[], action: PayloadAction<string>) => {
//           return state.filter((room: Room) => room.room_id !== action.payload);
//         },
        
//         // Update last prompt
//         updateLastPrompt: (state: Room[], action: PayloadAction<{ room_id: string, last_prompt: string }>) => {
//           const room = state.find((r: Room) => r.room_id === action.payload.room_id);
//           if (room) {
//             room.last_prompt = action.payload.last_prompt;
//           }
//         }
//       }
//     }).reducer,
    
//     messages: createSlice({
//       name: 'messages',
//       initialState: messages,
//       reducers: {
//         // Add a new message
//         addMessage: (state: Message[], action: PayloadAction<{ room_id: string, msg_id: string, prmt: string, des: string }>) => {
//           const newMessage: Message = {
//             room_id: action.payload.room_id,
//             msg_id: action.payload.msg_id,
//             prmt: action.payload.prmt,
//             des: action.payload.des,
//           };
//           state.push(newMessage);
//         },
        
//         // Remove messages for a specific room
//         removeRoomMessages: (state: Message[], action: PayloadAction<string>) => {
//           return state.filter((msg: Message) => msg.room_id !== action.payload);
//         }
//       }
//     }).reducer,
    
//     activeRoom: createSlice({
//       name: 'activeRoom',
//       initialState: activeRoomId,
//       reducers: {
//         // Set active room
//         setActiveRoom: (state: string, action: PayloadAction<string>) => {
//           return action.payload;
//         }
//       }
//     }).reducer,

//     prompt: createSlice({
//       name: 'setPrompt',
//       initialState: prompt,
//       reducers: {
//         // Set active room
//         setActivPrompt: (state: string, action: PayloadAction<string>) => {
//           return action.payload;
//         }
//       }
//     }).reducer
//   }
// });export default store;

// // Export action creators
// export const { 
//   addRoom, 
//   // removeRoom, 
//   // updateLastPrompt 
// } = store.rooms.actions
//   export const { 
//   addMessage, 
//   removeRoomMessages 
// } = store.getState().messages;

// export const { 
//   setActiveRoom 
// } = store.getState().activeRoom;
// export const { 
//   setActivPrompt 
// } = store.getState().prompt;