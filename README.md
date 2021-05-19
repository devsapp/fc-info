## 组件说明

fc-info 用于获取远端函数计算资源

## 具体用法

### s cli 方式

```
$ s cli fc-info --service --name ${serviceName} --region ${region} --access ${access}
$ s cli fc-info --function --name ${functionName} --service-name ${serviceName} --region ${region} --access ${access}
$ s cli fc-info --trigger --name ${triggerName} --service-name ${serviceName} --function-name ${functionName} --region ${region} --access ${access}
```

### 应用编排使用方式

查看 example 下 s.yaml


