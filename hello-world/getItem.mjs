import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = `${process.env.SERVICE_NAME}-${process.env.STAGE}-items`;
export const handler = async (event) => {
  try {
    const body = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: { id: event.pathParameters.id }
      })
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body.Item)
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(err.message)
    };
  }
};