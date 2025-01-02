import Navbar from './components/navbar/page'
import Landingpage from "./components/landingpage/page";
import Footer from "./components/footer/page"
import Body_com from "./components/body_content/page"
import AdvancedLoadingScreen from './components/animate_page'
import AllComponents from './components/allComponents';
import { cookies } from 'next/headers'
import ChatMessageFormatter from './resoponseFormatter'
export default function Home() {
let message= `Machine learning (ML) is a branch of artificial intelligence (AI) that focuses on enabling computer systems to learn from data without being explicitly programmed.  Instead of relying on pre-defined rules, ML algorithms identify patterns,  make predictions, and improve their performance over time based on the data they are exposed to. Here are the basics  broken down: 1. Data is King: Machine learning algorithms rely heavily  on data. The more relevant and high-quality data you provide, the better  the algorithms performance will be. This data can be anything from  images and text to numbers and sensor readings. 2. Algorithms are the Engine: These are the mathematical formulas and procedures thatprocess the data. Different algorithms are suited for different tasks and types of data. Some popular examples include: Supervised Learning: The algorithm learns from labeled data (data with known inputs and outputs).   Examples include: **Regression: Predicting a continuous value (e.g., house price prediction). *CaPredicting a categorical value (e.g., spam detection).  *Unsupervised Learning: The algorithm learns from unlabeled  data (data without known outputs). Examples include: *Clustering: Grouping similar data points together (e.g., customer segmentation). *Dimensionality Reduction: Reducing the number of   variables while retaining important information. *Reinforcement Learning: The algorithm learns through trial and error by interacting with an environment and receiving rewards or penalties. Examples include: *Game playing: AlphaGos victory over a Go champion. *Robotics: Training robots to perform tasks. 3. Training the Model: The process of feeding data to the algorithm and allowing it to learn the underlying patterns is called training. During training, the algorithm adjusts its internal parameters to minimize errors and improve its accuracy. 4. Evaluation and Tuning: After training, the models performance is evaluated using metrics specific to the task (e.g., accuracy, precision, recall). Based on the evaluation, the model may be further tunesting parameters or using different algorithms. 5. Prediction and Deployment: Once the model is deemed satisfactory, it can be deployed to make predictions on new, unseen data. This could involve integrating the model into a larger system or application. In short:** Machine learning involves feeding data into algorithms, training those algorithms to identify patterns, and then using those trained algorithms to make predictions or decisions on new data. Its an iterative process of data collection, algorithm selection, training, evaluation, and deployment. The success of machine learning relies on the quality of the data and the appropriate choice of algorithm.`;
  

  const cookieStore = cookies()
  const cookieData = cookieStore.get("CognitoIdentityServiceProvider.58naai034kd5bn6itu7cip557h.LastAuthUser")
  return (
    <main className=" bg-gradient-to-r from-black  to-indigo-700 flex min-h-screen flex-col "> 


      <AllComponents cookieData={cookieData}/>

      {/* <ChatMessageFormatter message={message}/> */}





    </main>
  )
}
