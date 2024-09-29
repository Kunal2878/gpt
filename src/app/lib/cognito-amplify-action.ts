"use client"
import { redirect } from "next/navigation";
import * as React from 'react'
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
} from "aws-amplify/auth";
// import { getErrorMessage } from "@/utils/get-error-message";
import useGlobalState from '../../app/swrHook' 
import {getErrorMessage} from '../utils/get-error-message'
export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  const { state, updateState } = useGlobalState();
  const [email, setEmail] = React.useState('')
  updateState({ email: String(formData.get("email")) });
  React.useEffect(() => {
    // updateState({ email: String(formData.get("email")) });
    if (state?.email) {
      setEmail(state.email)
    }
  }, [state?.email])
  try {
    console.log(state?.email, email)
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("username")),
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
    return getErrorMessage(error);
  }

  redirect("/ui/confirm-signup");}

export async function handleSendEmailVerificationCode(  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(

  prevState: string | undefined,
  formData: FormData
) {
  const { state, updateState } = useGlobalState();

  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      // username: String(formData.get("email")),
      username: String(state?.email),
      confirmationCode: String(formData.get("code")),
    });
  } catch (error) {
    // return getErrorMessage(error);
  }
  redirect("/ui/login");
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = "/ui/confirm-signup";
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    // console.log(getErrorMessage(error));
  }
  redirect("/");
}