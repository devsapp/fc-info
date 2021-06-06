"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INFO_HELP_INFO = exports.COMPONENT_HELP_INFO = void 0;
exports.COMPONENT_HELP_INFO = [
    {
        header: 'fc-info component',
        content: 'You can use the component to display the information of alicloud function computer resources.',
    },
    {
        header: 'Usage',
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
exports.INFO_HELP_INFO = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ2EsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFLCtGQUErRjtLQUN6RztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUU7WUFDUCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFO1lBQ3RELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsa0VBQWtFLEVBQUU7U0FDOUY7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFNBQVMsRUFBRSxvQkFBb0I7Z0JBQy9CLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUU7WUFDUCxpQkFBaUI7U0FDbEI7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1Asa0RBQWtEO1NBQ25EO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxjQUFjLEdBQUc7SUFDNUI7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRSxzRUFBc0U7S0FDaEY7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLG9CQUFvQjtLQUM5QjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLHNCQUFzQjtnQkFDakMsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixTQUFTLEVBQUUsMkJBQTJCO2dCQUN0QyxXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFNBQVMsRUFBRSw0QkFBNEI7Z0JBQ3ZDLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsU0FBUyxFQUFFLDJCQUEyQjtnQkFDdEMsV0FBVyxFQUFFLHFKQUFxSjtnQkFDbEssSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsaUJBQWlCO1NBQ2xCO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRTtZQUNQLG9LQUFvSztZQUNwSywwVEFBMFQ7U0FDM1Q7S0FDRjtDQUNGLENBQUMifQ==