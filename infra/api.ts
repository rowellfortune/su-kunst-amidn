import { bucket } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link:  [bucket],
      },
      args: {
        auth: { iam: true }
      },
    }
  }
});