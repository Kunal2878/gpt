"use client";

import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import * as React from 'react'
import { RootState } from '../../store/state'
import { useSelector, useDispatch } from 'react-redux';
import {
  resendSignUpCode,
  autoSignIn
} from "aws-amplify/auth";


export default function SendVerificationCode() {

  const email=useSelector((state:RootState) => state.chat.email);
  const [response, dispatch] = useFormState(handleSendEmailVerificationCode, {
    message: "",
    errorMessage: "",
  });

  async function handleSendEmailVerificationCode(  prevState: { message: string; errorMessage: string },
    formData: FormData
  ) {
    let currentState;
    try {
      await resendSignUpCode({
        username: email|| '',
      });
      currentState = {
        ...prevState,
        message: "Code sent successfully",
      };
    } catch (error) {
      currentState = {
        ...prevState,
        // errorMessage: getErrorMessage(error),
      };
    }
  
    return currentState;
  }
  
  const { pending } = useFormStatus();
  return (
    <>
      <button
        className="mt-4 w-full"
        aria-disabled={pending}
        formAction={dispatch}
      >
        Resend Verification Code{" "}
        {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
      </button>
      <div className="flex h-8 items-end space-x-1">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {response?.errorMessage && (
            <>
              {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">{response.errorMessage}</p>
            </>
          )}
          {response?.message && (
            <p className="text-sm text-green-500">{response.message}</p>
          )}
        </div>
      </div>
    </>
  );
}