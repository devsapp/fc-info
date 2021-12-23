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
                name: 'access',
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
            '$ s cli {bold fc-info} {bold info} {bold --help}',
        ],
    },
];
exports.INFO_HELP_INFO = [
    {
        header: 'Info',
        content: 'Query online resource details.',
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
                typeLabel: '{underline string}',
                description: 'Specify the region of alicloud.',
                alias: 'r',
                type: String,
            },
            {
                name: 'service-name',
                typeLabel: '{underline string}',
                description: 'Specify the alicloud fc service name.',
                type: String,
            },
            {
                name: 'function-name',
                typeLabel: '{underline string}',
                description: 'Specify the alicloud fc function name.',
                type: String,
            },
            {
                name: 'trigger-name',
                typeLabel: '{underline string}',
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
                name: 'access',
                typeLabel: '{underline string}',
                description: 'Specify key alias.',
                alias: 'a',
                type: String,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s {bold info}',
            '$ s <ProjectName> {bold info}',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli {bold fc-info} {bold info} [{bold --service-name} {underline serviceName}] [{bold --region} {underline region}] [{bold --access} {underline accessName}]',
            '$ s cli {bold fc-info} {bold info} [{bold --service-name} {underline serviceName}] [{bold --function-name} {underline functionName}] [{bold --trigger-name} {underline functionNameA}] [{bold --trigger-name} {underline functionNameB}] [{bold --region} {underline region}] [{bold --access} {underline accessName}]',
            "\nYou also can refer to the usage of fc-api and execute [s cli fc-api -h] for help.\n      $ s cli fc-api listSerices\n      $ s cli fc-api listFunctions --serviceName myService",
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ2EsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFLCtGQUErRjtLQUN6RztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUU7WUFDUCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFO1lBQ3RELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsa0VBQWtFLEVBQUU7U0FDOUY7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRTtZQUNQLGlCQUFpQjtTQUNsQjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUU7WUFDUCxrREFBa0Q7U0FDbkQ7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM1QjtRQUNFLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFLGdDQUFnQztLQUMxQztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsb0JBQW9CO0tBQzlCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7Z0JBQy9CLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixXQUFXLEVBQUUscUpBQXFKO2dCQUNsSyxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1AsaUJBQWlCO1lBQ2pCLCtCQUErQjtTQUNoQztLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLE9BQU8sRUFBRTtZQUNQLGtLQUFrSztZQUNsSyx3VEFBd1Q7WUFDeFQsbUxBRXFEO1NBQ3REO0tBQ0Y7Q0FDRixDQUFDIn0=