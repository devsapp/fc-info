export declare const COMPONENT_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        name: string;
        summary: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        typeLabel?: undefined;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: StringConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const INFO_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: StringConstructor;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        typeLabel?: undefined;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: StringConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
