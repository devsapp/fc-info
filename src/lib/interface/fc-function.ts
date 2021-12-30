
export interface FunctionConfig {
  name: string;
  description?: string;
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  handler: string;
  memorySize?: number;
  gpuMemorySize?: number;
  runtime: string;
  timeout?: number;
  environmentVariables?: {
    [key: string]: any;
  };
  initializationTimeout?: number;
  initializer?: string;
  instanceConcurrency?: number;
  instanceType?: string;
  customDNS?: CustomDNS;
  layers?: string[];
  asyncConfiguration?: {
    statefulInvocation?: boolean;
    maxAsyncRetryAttempts?: number;
    maxAsyncEventAgeInSeconds?: number;
    destination?: {
      onSuccess?: string;
      onFailure?: string;
    };
  };
}

export interface CustomDNS {
  nameServers?: string[] | null;
  searches?: string[] | null;
  dnsOptions?:  Array<{
    name: string;
    value: string;
  }> | null;
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
}
