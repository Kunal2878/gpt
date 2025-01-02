import Navbar from './components/navbar/page'
import Landingpage from "./components/landingpage/page";
import Footer from "./components/footer/page"
import Body_com from "./components/body_content/page"
import AdvancedLoadingScreen from './components/animate_page'
import AllComponents from './components/allComponents';
import { cookies } from 'next/headers'
export default function Home() {
const cookieStore = cookies()
const cookieData = cookieStore.get("CognitoIdentityServiceProvider.58naai034kd5bn6itu7cip557h.LastAuthUser")
 
{/* <main className=" bg-white/70 flex min-h-screen flex-col "> */}
return (
 <main className=" bg-gradient-to-r from-black  to-indigo-700 flex min-h-screen flex-col "> 

<AllComponents cookieData={cookieData}/>


{/* <div className="w-full flex min-h-screen flex-col   top-0 "> 

 <Navbar/>
<Landingpage/> 

</div>

      <Body_com/>
      <Footer/> */}


</main>
  )
}
