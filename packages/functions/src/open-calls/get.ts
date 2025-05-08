import { Resource } from "sst";
import { Util } from "@su-kunst-admin/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.SuKunstAdmin.name,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
        PK: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
        SK: event?.pathParameters?.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.send(new GetCommand(params));
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return JSON.stringify(result.Item);
});