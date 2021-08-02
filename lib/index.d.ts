import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class FcInfoComponent extends BaseComponent {
    constructor(props: any);
    private report;
    private argsParser;
    /**
     * info
     * @param inputs
     * @returns
     */
    info(inputs: InputProps): Promise<any>;
    help(inputs: InputProps): Promise<void>;
    private getFcEndpoint;
}
