"use server"
import { cookies } from 'next/headers'
export async function fetchUserData(){
  const cookieStore = cookies()
  const cookieData = cookieStore.get("CognitoIdentityServiceProvider.58naai034kd5bn6itu7cip557h.LastAuthUser")
if(cookieData){

    // setIsLogin?.(true)
return cookieData

}
  return null
}