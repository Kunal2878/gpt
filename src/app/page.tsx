import Navbar from './components/navbar/page'
import Landingpage from "./components/landingpage/page";
import Footer from "./components/footer/page"
import Body_com from "./components/body_content/page"
export default function Home() {
  return (
<main className=" bg-gradient-to-r from-black  to-indigo-700 flex min-h-screen flex-col ">
<div className="w-full flex min-h-screen flex-col   top-0 "> 

 <Navbar/>
<Landingpage/> 

</div>

      <Body_com/>
      <Footer/>

    </main>
  );
}
