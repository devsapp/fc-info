import _ from 'lodash';
import path from 'path';
import ComponentStarter from '../src/index';
import sinon from 'sinon';
import fse from 'fs-extra';
import FC from '@alicloud/fc2';

const sandbox = sinon.createSandbox();
const componentStarter = new ComponentStarter();

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
  beforeEach(async () => {
    sandbox.stub(FC.prototype, 'getService').resolves({
      data: { name },
    });
    sandbox.stub(FC.prototype, 'listFunctions').resolves({
      data: { functions: [{ name }],}
    });
    sandbox.stub(FC.prototype, 'getFunction').resolves({
    data: { functionName: name, 
      handler: 'index.handler',
      memorySize: 128, }
    });
    sandbox.stub(FC.prototype, 'getFunctionCode').resolves({
      data: { url: 'https://registry.devsapp.cn/simple/devsapp/fc-info/zipball/0.0.11' }
    });
    sandbox.stub(FC.prototype, 'listTriggers').resolves({
      data: { triggers: [{ name }] },
    });
    sandbox.stub(FC.prototype, 'getTrigger').resolves({
      data: {
        triggerName: 'httpTrigger',
        triggerType: 'http',
	triggerConfig: {
          authType: 'anonymous',
          methods: 'GET' },
      },
    });
  });

  afterEach(async () => {
    sandbox.restore();
    await fse.remove(dir);
  });

  it('info function', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = 'info';
    const result = await componentStarter.info(inp);
    expect(result).toEqual({
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
      try {
          await componentStarter.info(inp);
      } catch (e) {
          expect(e).toEqual(new Error(`You must provide serviceName.`));
      }
  });

  it('info help', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = `--help`;
    const result = await componentStarter.info(inp);
    expect(result).toBeUndefined();
  });
});
