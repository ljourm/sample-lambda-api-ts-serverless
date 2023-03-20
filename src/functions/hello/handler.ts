import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI, { Request, Response } from 'lambda-api';

const api = createAPI();

api.get('/status', async (req: Request, res: Response) => {
  return { status: 'ok' };
});

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return await api.run(event, context);
};
