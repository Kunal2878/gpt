import Image from "next/image";
import Navbar from './components/navbar/page'
import Landingpage from "./components/landingpage/page";
import UserPrompt from "./components/userprompt/prompt";
import SignUp from "./ui/signup/page";
import Footer from "./components/footer/page"
import Body_com from "./components/body_content/page"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col dark:bg-black bg-white ">
<div className="w-full flex min-h-screen flex-col   top-0 "> 
<Navbar/>
<Landingpage/>
</div>
   


      <Body_com/>
      <Footer/>

    </main>
  );
}
