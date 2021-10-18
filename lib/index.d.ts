import { InputProps } from './common/entity';
export default class FcInfoComponent {
    private report;
    private argsParser;
    /**
     * info
     * @param inputs
     * @returns
     */
    info(inputs: InputProps): Promise<any>;
    help(): Promise<void>;
    private getFcClient;
}
