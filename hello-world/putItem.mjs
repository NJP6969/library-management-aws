import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = `${process.env.SERVICE_NAME}-${process.env.STAGE}-items`;
export const handler = async (event) => {
  try {
    const requestJSON = JSON.parse(event.body);
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: requestJSON.id,
          price: requestJSON.price,
          name: requestJSON.name
        }
      })
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Put item ${requestJSON.id}`)
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(err.message)
    };
  }
};