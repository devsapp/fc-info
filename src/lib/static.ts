
export const COMPONENT_HELP_INFO = [
  {
    header: 'fc-info component',
    content: 'You can use the component to display the information of alicloud function computer resources.',
  },
  {
    header: 'Synopsis',
    content: '$ s <command> <options>',
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information.' },
      { name: 'info', summary: 'Display the information of alicloud function computer resources.' },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Display help for command.',
        alias: 'h',
        type: Boolean,
      },
      {
        name: 'aliasName',
        typeLabel: '{underline <name>}',
        description: 'Specify the key name.',
        alias: 'a',
        type: String,
      },
    ],
  },
  {
    header: 'YML Examples',
    content: [
      '$ s {bold help}',
    ],
  },
  {
    header: 'CLI Examples',
    content: [
      '$ s cli {bold fc-info} {bold info} {bold --help}'
    ],
  },
];

export const INFO_HELP_INFO = [
  {
    header: 'Info resources',
    content: 'Info resources, you can set attributes in command line or s.yml/yaml',
  },
  {
    header: 'Usage',
    content: '$ s info <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        typeLabel: '{underline <region>}',
        description: 'Specify the region of alicloud.',
        alias: 'r',
        type: String,
      },
      {
        name: 'service-name',
        typeLabel: '{underline <serviceName>}',
        description: 'Specify the alicloud fc service name.',
        type: String,
      },
      {
        name: 'function-name',
        typeLabel: '{underline <functionName>}',
        description: 'Specify the alicloud fc function name.',
        type: String,
      },
      {
        name: 'trigger-name',
        typeLabel: '{underline <triggerName>}',
        description: 'Specify the alicloud fc trigger name, you can set names by using multiple trigger-name option, eg: --trigger-name triggerA --trigger-name triggerB.',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Display help for command.',
        alias: 'h',
        type: Boolean,
      },
      {
        name: 'aliasName',
        typeLabel: '{underline <name>}',
        description: 'Specify the key name.',
        alias: 'a',
        type: String,
      },
    ],
  },
  {
    header: 'YML Examples',
    content: [
      '$ s {bold info}',
    ],
  },
  {
    header: 'CLI Examples',
    content: [
      '$ s cli {bold fc-info} {bold info} [{bold --service-name} {underline serviceName}] [{bold --region} {underline region}] [{bold --aliasName} {underline aliasName}]',
      '$ s cli {bold fc-info} {bold info} [{bold --service-name} {underline serviceName}] [{bold --function-name} {underline functionName}] [{bold --trigger-name} {underline functionNameA}] [{bold --trigger-name} {underline functionNameB}] [{bold --region} {underline region}] [{bold --aliasName} {underline aliasName}]',
    ],
  },
];