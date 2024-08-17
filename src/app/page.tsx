import Image from "next/image";
import Navbar from './components/navbar/page'
import Landingpage from "./components/landingpage/page";
import UserPrompt from "./components/userprompt/page";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 ">
      <Navbar/>
      <Landingpage/>
      <UserPrompt/>
    </main>
  );
}
