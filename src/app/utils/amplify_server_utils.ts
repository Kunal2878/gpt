import { authConfig } from "../amplify-cognito_config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
export const {runWithAmplifyServerContext} = createServerRunner({
    config:{
        Auth:authConfig
    }
})