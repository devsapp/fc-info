export interface ServiceConfig {
  name: string;
  description?: string;
  internetAccess?: boolean;
  logConfig?: LogConfig;
  role?: string;
  vpcConfig?: VpcConfig;
  nasConfig?: NasConfig;
  vpcBinding?: string[];
  ossMountConfig?: OSSMountConfig;
}

export interface OSSMountConfig {
  mountPoints: {
    endpoint: string;
    bucketName: string;
    mountDir: string;
    readOnly?: boolean;
  };
}

export interface LogConfig {
  project: string;
  logstore: string;
}

export interface VpcConfig {
  securityGroupId: string;
  vswitchIds: string[];
  vpcId?: string;
}

export interface NasConfig {
  userId?: number;
  groupId?: number;
  mountPoints: MountPoint[];
}

export interface MountPoint {
  serverAddr?: string;
  nasDir: string;
  fcDir: string;
}
