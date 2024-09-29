'use client'
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import  {UseAppContext}  from '../../index'
import { redirect } from "next/navigation";
import Link from "next/link";
import {signUp} from "aws-amplify/auth";
export default function SignUp() {
  const context = UseAppContext();
  const { email,setEmail} = context || {};


  async function handleSignUp(
    prevState: string | undefined,
    formData: FormData
  ) {
  
    try {

      const { isSignUpComplete, userId, nextStep } = await signUp({
  
        username: String(formData.get("email")),
        password: String(formData.get("password")),
  
        options: {
          userAttributes: {
            email: String(formData.get("email")),
            name: String(formData.get("username")),
          },
          // optional
          autoSignIn: true,
        },
      });
      // console.log(formData,isSignUpComplete, "",userId, "\n", nextStep)
  
    } catch (error) {
      console.log(error)
      // return getErrorMessage(error);
    }
  
    redirect("/ui/confirm-signup");}




  const [errorMessage, dispatch] = useFormState(handleSignUp as any, undefined);
  return (
    <div className="min-h-screen  bg-gradient-to-tl from-purple-700 via-indigo-600 to-pink-400   lg:bg-gradient-to-r lg:from-purple-200 lg:to-indigo-600 flex flex-col lg:flex-row items-center justify-center lg:p-4">
        <div className="w-full lg:w-1/3 hidden lg:block relative h-[450px] bg-gradient-to-tl from-purple-700 via-indigo-600 to-pink-400 rounded-l-lg">
        <div className="flex justify-between items-center p-8">
          <h2 className="text-white text-2xl font-bold">TalkToGPT</h2>
        </div>
        <div className="mb-6 absolute bottom-0 flex justify-between items-center p-4">
          <h2 className="text-white text-xl font-bold flex flex-row w-full justify-center items-center flex-nowrap">Welcome to the era of limitless conversations...</h2>
        </div>

        </div>
        <div className="lg:hidden absolute top-0 flex justify-between items-center p-8 bg-gradient-to-tl from-purple-700 via-indigo-600 to-pink-400  w-full z-10 h-32">
          <h2 className="text-white text-2xl font-bold">TalkToGPT</h2>
        </div>
      <div className=" relative bg-black shadow-xl rounded-t-2xl  lg:rounded-t-none l g:rounded-r-lg overflow-hidden w-full lg:w-1/3 lg:h-[450px] h-screen z-50 mt-32 lg:mt-0">
    
      <div className=" lg:hidden absolute bottom-0 flex justify-between items-center p-4 w-full ">
          <h2 className="p-2 text-white text-3xl font-bold flex flex-row flex-wrap w-full justify-center items-center ">"Welcome to the era of limitless conversations..."</h2>
        </div>


        <div className="p-4 ">
          <h3 className="text-white text-xl font-semibold mb-6">
          Sign Up
          </h3>
          <form action={dispatch}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block items-center w-4/5 px-2 py-1 text-sm  bg-gray-900 rounded-xl outline-none focus:ring-indigo-500  focus:ring-2  hover:ml-6 transition-all"
                placeholder="X_AE_A_13b"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 flex items-center w-4/5 px-2 py-1 text-sm  bg-gray-900 rounded-xl outline-none  focus:ring-indigo-500  focus:ring-2  hover:ml-6 transition-all"
                placeholder="example@gmail.com"
                value={email || ''}
                onChange={(e) => {setEmail?.(e.target.value)}}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="flex text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 flex w-4/5 items-center px-2 py-1 text-sm bg-gray-900 rounded-xl   outline-none  focus:ring-indigo-500  focus:ring-2 transition-all hover:ml-6 "
                placeholder="********"
              />
              {/* <p className="text-green-600 text-sm mt-2">Password strength: Strong</p> */}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl transition-all"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-gray-500">
              Already have an account?{" "}
            <Link href="\ui\login\" className="text-indigo-600 hover:underline">
                Sign In.
              </Link>
            </p>
            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Sign Up with Google
              </button>
            </div>
            <div className="flex h-8 items-end space-x-1">
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
}
