
import UserContentTemp from './usercontenttemp'
import {cookies} from 'next/headers'
export default async function  UserChat()

{
  let isCookie: boolean = false
  let user:any
  const cookieStore = cookies()
  const cookieData = cookieStore.get("CognitoIdentityServiceProvider.58naai034kd5bn6itu7cip557h.LastAuthUser")

if(cookieData){
  isCookie = true
}

return(

<UserContentTemp isCookieData= {isCookie}  />  

)




}