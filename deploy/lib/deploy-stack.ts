import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { config } from "dotenv";

config();
export class CartStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartModule = new lambda.Function(this, 'cartModuleLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('../dist/'),
      handler: 'main.handler',
      environment: {
        HOST: process.env.HOST || '',
        USERNAME: process.env.USERNAME || '',
        PASSWORD: process.env.PASSWORD || '',
      },
    });

    const api = new apigateway.RestApi(this, 'cartModuleAPI', {
      // handler: cartModule,
      // proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });

    const proxyResource = api.root.addResource('{proxy+}');
    proxyResource.addMethod('ANY', new apigateway.LambdaIntegration(cartModule));
  }
}
