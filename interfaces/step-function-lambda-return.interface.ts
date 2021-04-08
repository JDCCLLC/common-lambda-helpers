import { LambdaReturn } from '../index'

/** Step Function State Machine Lambda Return - adds sfnOutput */
export interface SfnLambdaReturn extends LambdaReturn {
  sfnOutput: any
}