"use client";


import { useFormState, useFormStatus } from "react-dom";
import SendVerificationCode from "../../ui/send-code/page";
import { redirect } from "next/navigation";
import * as React from 'react'
import {
  confirmSignUp,

} from "aws-amplify/auth";
import  {UseAppContext}  from '../../index'

export default function ConfirmSignUpForm() {
  const context = UseAppContext();
  const { email} = context || {};
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp as any, undefined);

  async function handleConfirmSignUp(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email || '',
        confirmationCode: String(formData.get("code")),
      });
    } catch (error) {
      // return getErrorMessage(error);
    }
    redirect("/ui/login");
  }

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
      <div className=" bg-black relative shadow-xl rounded-t-2xl  lg:rounded-t-none l g:rounded-r-lg overflow-hidden w-full lg:w-1/3 lg:h-[450px] h-screen z-50 mt-32 lg:mt-0">
        <div className=" lg:hidden absolute bottom-0 flex justify-between items-center p-4 w-full ">
          <h2 className="p-2 text-white text-3xl font-bold flex flex-row flex-wrap w-full justify-center items-center ">"Welcome to the era of limitless conversations..."</h2>
        </div>
        <div className="p-4 ">
          <h3 className="text-white text-xl font-semibold mb-6">
            Confirm Sign Up
          </h3>
          <form action={dispatch}>
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
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="flex text-sm font-medium text-white"
              >
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className="mt-1 flex w-4/5 items-center px-2 py-1 text-sm bg-gray-900 rounded-xl   outline-none  focus:ring-indigo-500  focus:ring-2 transition-all hover:ml-6 "
                placeholder="Enter your code here"
                minLength={6}
                required
              />
            </div>
            <div className="mb-4">
              <ConfirmButton />
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
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
function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4  w-full px-4 py-2 bg-indigo-600 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl transition-all" aria-disabled={pending}>
      Confirm 
    </button>
  );
}