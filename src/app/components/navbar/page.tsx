
import Nav from "./Navbar"
import { cookies } from 'next/headers'
const Navbar = () => {

  let isCookie: boolean = false
  const cookieStore = cookies()
  const cookieData = cookieStore.get("CognitoIdentityServiceProvider.58naai034kd5bn6itu7cip557h.LastAuthUser")
 
if(cookieData){
  isCookie = true
}

  return (
    <div className="w-full">
      <Nav isCookie={isCookie} />
    </div>
  )
}

export default Navbar
