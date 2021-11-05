import _ from 'lodash';
import path from 'path';
import ComponentStarter from '../src/index';
import fse from 'fs-extra';
import FC from '@alicloud/fc2';

const name = 'testSuite';
const dir = './test/testInfo/';
const inputs = {
  props: {
    region: 'cn-shenzhen',
    serviceName: name,
    functionName: name,
  },
  credentials: {
    AccountID: 'AccountID',
    AccessKeyID: 'AccessKeyID',
    AccessKeySecret: 'AccessKeySecret',
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

describe('test/index.test.ts', () => {
  let componentStarter;
  beforeEach(async () => {
    const fcClient = new FC(inputs.credentials.AccountID, {
      accessKeyID: inputs.credentials.AccessKeyID,
      accessKeySecret: inputs.credentials.AccessKeySecret,
      region: inputs.props.region,
    });
    fcClient.getService = () => ({ data: { name } });
    fcClient.listFunctions = () => ({ data: { functions: [{ name }], } });
    fcClient.getFunction = () => ({
      data: { functionName: name, 
        handler: 'index.handler',
        memorySize: 128, }
    });
    fcClient.getFunctionCode = () => ({ data: { url: 'https://registry.devsapp.cn/simple/devsapp/fc-info/zipball/0.0.11' } });
    fcClient.listTriggers = () => ({ data: { triggers: [{ name }] }, });
    fcClient.getTrigger = () => ({
      data: {
        triggerName: 'httpTrigger',
        triggerType: 'http',
	triggerConfig: {
          authType: 'anonymous',
          methods: 'GET' },
      },
    });


    componentStarter = new ComponentStarter();
    componentStarter.getFcClient = jest.fn();
    componentStarter.getFcClient.mockReturnValue(fcClient)
  });

  afterEach(async () => {
    await fse.remove(dir);
  });

  it('info function', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = 'info';
    const result = await componentStarter.info(inp);
    expect(result).toEqual({
      region: inp.props.region,
      function: {
        handler: "index.handler",
        instanceType: undefined, 
        memorySize: 128, 
        name: name,
        runtime: undefined,
        timeout: undefined
      },
      service: {
        internetAccess: undefined,
	      name: "testSuite"
      },
      triggers: [{
          config: {
            authType: "anonymous",
            methods: "GET",
            qualifier: undefined
          },
          name: undefined,
          type: "http"
      }]
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

  it('info help', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = `--help`;
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.info(inp);
    expect(result).toBeUndefined();
  });
});
