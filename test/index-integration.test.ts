import _ from 'lodash';
import FC from '@alicloud/fc2';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import { exec } from 'child_process';
import ComponentStarter from '../src/index';

describe('Integration::command', () => {
  dotenv.config();

  const name = 'fc-info-testsuite'
  const serviceName = `service-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`
  const funcName = `func-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`
  const triggerName = `trigger-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`

  const inputs = {
    props: {
      region: 'cn-shenzhen',
      serviceName: serviceName,
      functionName: funcName,
    },
    appName: 'fc-info-test',
    project: {
      component: 'devsapp/fc-info',
      access: name,
      projectName: 'test',
    },
    command: '',
    args: '',
    path: {
      configPath: path.join(process.cwd(), '..', 'example', 's.yaml'),
    },
  };

  const client = new FC(process.env.AccountID, {
      accessKeyID: process.env.AccessKeyID,
      accessKeySecret: process.env.AccessKeySecret, 
      region: 'cn-shenzhen',
  });

  beforeAll(async () => {
    await exec(`s config add --AccountID ${process.env.AccountID} --AccessKeyID ${process.env.AccessKeyID} --AccessKeySecret ${process.env.AccessKeySecret} -a ${name}`);
    // create service
    try {
      await client.createService(serviceName);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await exec(`s config delete -a ${name}`);
    fs.removeSync(path.join(process.cwd(), '.s'));

    // remove service
    try {
      await client.deleteService(serviceName);
    } catch (err) {
      console.error(err);
    }
  })

  // no trigger
  it('info function without trigger', async () => {
    const zipFile = 'UEsDBAoAAAAIABULiFLOAhlFSQAAAE0AAAAIAAAAaW5kZXguanMdyMEJwCAMBdBVclNBskCxuxT9UGiJNgnFg8MX+o4Pc3R14/OQdkOpUFQ8mRQ2MtUujumJyv4PG6TFob3CjCEve78gtBaFkLYPUEsBAh4DCgAAAAgAFQuIUs4CGUVJAAAATQAAAAgAAAAAAAAAAAAAALSBAAAAAGluZGV4LmpzUEsFBgAAAAABAAEANgAAAG8AAAAAAA==';
    await client.createFunction(serviceName, {
          functionName: funcName,
          handler: 'index.handler',
          memorySize: 128,
          runtime: 'nodejs12',
          code: {
            zipFile,
	  },
    });
 
    const inp = _.cloneDeep(inputs);
    inp.args = 'info';
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.info(inp);
    expect(result).toEqual({
      region: inp.props.region,
      "function":{
        "environmentVariables":{
         },
        "handler":"index.handler",
        "initializationTimeout":3,
        "instanceConcurrency":1,
        "instanceType":"e1",
        "memorySize":128,
        "name":funcName,
        "runtime":"nodejs12",
        "timeout":3
      },
      "service":{
        "internetAccess":true,
        "name":serviceName
      }
    });
  });

  it('info with empty service name', async () => {
      const inp = _.cloneDeep(inputs);
      inp.props.serviceName = "";
      const componentStarter = new ComponentStarter();
 
      try {
          await componentStarter.info(inp);
      } catch (e) {
          expect(e).toEqual(new Error(`You must provide serviceName.`));
      }
  });

  it('info function with http trigger', async () => {
    await client.createTrigger(serviceName, funcName, {
        triggerName,
        triggerType: 'http',
        TriggerConfig: {
            authType: 'anonymous',
            methods: ['GET'],
        }
    });
    const inp = _.cloneDeep(inputs);
    inp.args = 'info';
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.info(inp);
    expect(result).toEqual({
      region: inp.props.region,
      "triggers":[
        {
          "config":{
            "authType":"anonymous",
            "methods":[
              "GET"
            ],
            "qualifier":null
          },
          "name":triggerName,
          "type":"http"
        }
      ],
      "function":{
        "environmentVariables":{
        },
        "handler":"index.handler",
        "initializationTimeout":3,
        "instanceConcurrency":1,
        "instanceType":"e1",
        "memorySize":128,
        "name":funcName,
        "runtime":"nodejs12",
        "timeout":3
      },
      "service":{
        "internetAccess":true,
        "name":serviceName
      }
    });
    try {
        await client.deleteTrigger(serviceName, funcName, triggerName);
    } catch(err) { console.log(err); }
  });

  it('info function with oss trigger', async () => {
    const inp = _.cloneDeep(inputs);
    const bucketName = `bucket-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`
    const arn = `acs:oss:cn-shenzhen:${process.env.AccountID}:${bucketName}`;
    const role = `acs:ram::${process.env.AccountID}:role/AliyunOSSEventNotificationRole`;

    // create bucket
    let OSS = require('ali-oss');
    let clientOSS = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: process.env.AccessKeyID,
      accessKeySecret: process.env.AccessKeySecret,
    });

    try {
      const options = {
        storageClass: 'Standard',
        acl: 'private',
        dataRedundancyType: 'LRS',
      }
      await clientOSS.putBucket(bucketName, options);
    } catch (err) {
      console.log(err);
    }

    // create OSS trigger
    await client.createTrigger(serviceName, funcName, {
        triggerName,
        triggerType: 'oss',
	qualifier: "LATEST",
	invocationRole: role,
	sourceArn: arn,
        triggerConfig: {
          bucketName: bucketName,
	  events: ["oss:ObjectCreated:*"],
        }
    });
    inp.args = 'info';
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.info(inp);
    expect(result).toEqual({
      region: inp.props.region,
      "triggers":[
        {
          "config":{
            "bucketName":bucketName,
            "events":[
              "oss:ObjectCreated:*"
            ],
            "filter":{
              "Key":{
                "Prefix":"",
                "Suffix":""
              }
            },
            "qualifier":"LATEST"
          },
          "name":triggerName,
          "role":role,
          "sourceArn":arn,
          "type":"oss"
        }
      ],
      "function":{
        "environmentVariables":{
        },
        "handler":"index.handler",
        "initializationTimeout":3,
        "instanceConcurrency":1,
        "instanceType":"e1",
        "memorySize":128,
        "name":funcName,
        "runtime":"nodejs12",
        "timeout":3
      },
      "service":{
        "internetAccess":true,
        "name":serviceName
      }
    })

    try {
        await client.deleteTrigger(serviceName, funcName, triggerName);
        await client.deleteFunction(serviceName, funcName);
	} catch(err) { console.log(err); }
  });

  it('info help', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = '--help';
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.info(inp);
    expect(result).toBeUndefined();
  });
});
