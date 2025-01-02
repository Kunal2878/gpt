'use client'
import * as React from 'react'
import Navbar from './navbar/page'
import Landingpage from "./landingpage/page";
import Footer from "./footer/page"
import Body_com from "./body_content/page"
import AdvancedLoadingScreen from './animate_page'
export default function AllComponents ({cookieData}:{cookieData:any})
{
const [isLoading, setIsLoading] = React.useState(true);
console.log(cookieData)

    React.useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);
return(

<div className='w-full h-full flex flex-col'>
{


isLoading?(

<AdvancedLoadingScreen/>

):(
<div className="w-full h-full flex flex-col">


    <div className="w-full flex min-h-screen flex-col   top-0 "> 

<Navbar cookieData ={cookieData}/>
<Landingpage/> 

</div>
<Body_com/>
<Footer/>
</div>

)

}

</div>


)


}