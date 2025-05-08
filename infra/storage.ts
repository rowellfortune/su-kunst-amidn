// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("SuKunstAdmin", {
    fields: {
      PK: "string",
      SK: "string",
    },
    primaryIndex: { hashKey: "PK", rangeKey: "SK" },
  });