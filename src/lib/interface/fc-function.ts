
export interface FunctionConfig {
  name: string;
  description?: string;
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  customRuntimeConfig?: CustomRuntimeConfig;
  customHealthCheckConfig?: CustomHealthCheckConfig;
  handler: string;
  memorySize?: number;
  gpuMemorySize?: number;
  runtime: string;
  timeout?: number;
  cpu?: number;
  diskSize?: number;
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

export interface CustomHealthCheckConfig {
  httpGetUrl: string;
  initialDelaySeconds: number;
  periodSeconds: number;
  timeoutSeconds: number;
  failureThreshold: number;
  successThreshold: number;
}

export interface CustomDNS {
  nameServers?: string[] | null;
  searches?: string[] | null;
  dnsOptions?: Array<{
    name: string;
    value: string;
  }> | null;
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
  instanceID?: string;
  accelerationType?: 'Default' | 'None';
}

export interface CustomRuntimeConfig {
  command: string[];
  args?: string[];
}
