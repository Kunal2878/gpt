// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   addRoom, 
//   removeRoom, 
//   addMessage, 
//   removeRoomMessages, 
//   setActiveRoom,
//   updateLastPrompt
// } from './state';

// const ChatComponent = () => {
//   const dispatch = useDispatch();
  
//   // Selectors to access state
//   const rooms = useSelector((state: any) => state.rooms);
//   const messages = useSelector((state:any) => state.messages);
//   const activeRoomId = useSelector((state:any) => state.activeRoom);

//   // Create a new room
//   const handleCreateRoom = () => {
//     dispatch(addRoom());
//   };

//   // Send a message in a specific room
//   const handleSendMessage = (roomId:any, content:any) => {
//     // Add message
//     dispatch(addMessage({
//       room_id: roomId,
//       content,
      
//     }));

//     // Update last prompt for the room
//     dispatch(updateLastPrompt({
//       room_id: roomId,
//       last_prompt: content
//     }));
//   };

//   // Delete a room and its messages
//   const handleDeleteRoom = (roomId:any) => {
//     dispatch(removeRoom(roomId));
//     dispatch(removeRoomMessages(roomId));
//   };

//   // Set active room
//   const handleSetActiveRoom = (roomId:any) => {
//     dispatch(setActiveRoom(roomId));
//   };

//   return (
//     <div>
//       {/* Room creation button */}
//       <button onClick={handleCreateRoom}>Create New Room</button>

//       {/* Rooms list */}
//       {rooms.map((room:any) => (
//         <div key={room.room_id}>
//           <span onClick={() => handleSetActiveRoom(room.room_id)}>
//             {room.room_id}
//           </span>
//           <button onClick={() => handleDeleteRoom(room.room_id)}>
//             Delete Room
//           </button>
//         </div>
//       ))}

//       {/* Messages for active room */}
//       {activeRoomId && (
//         <div>
//           {messages
//             .filter((msg:any) => msg.room_id === activeRoomId)
//             .map((msg:any) => (
//               <div key={msg.id}>{msg.content}</div>
//             ))
//           }
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatComponent;