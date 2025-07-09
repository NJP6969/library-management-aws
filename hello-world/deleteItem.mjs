import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = `${process.env.SERVICE_NAME}-${process.env.STAGE}-items`;
export const handler = async (event) => {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id: event.pathParameters.id }
      })
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Deleted item ${event.pathParameters.id}`)
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(err.message)
    };
  }
};