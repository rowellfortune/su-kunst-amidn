import { Resource } from "sst";
import { Util } from "@su-kunst-admin/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.SuKunstAdmin.name,
    Key: {
        PK: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
        SK: event?.pathParameters?.id, // The id of the note from the path
    },
  };

  await dynamoDb.send(new DeleteCommand(params));

  return JSON.stringify({ status: true });
});