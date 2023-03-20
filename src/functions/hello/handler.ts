import { APIGatewayEvent, Context } from 'aws-lambda';

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ message: "hello world" }),
  };
};
