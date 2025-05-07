import {defineBackend} from '@aws-amplify/backend';
import {auth} from './auth/resource';
import {data} from './data/resource';
import {storage} from './storage/resource';
import * as cdk from 'aws-cdk-lib';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({auth, data, storage});

let {cfnBucket}  = backend.storage.resources.cfnResources;

cfnBucket.bucketName = 'jellicious-bucket';
cfnBucket.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);