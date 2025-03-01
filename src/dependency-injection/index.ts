import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

export const container = new ContainerBuilder();
export const buildContainer = async () => {
    try {
        const loader = new YamlFileLoader(container);
        const env = process.env.NODE_ENV || 'dev';
        await loader.load(`${__dirname}/application_${env}.yaml`);
    } catch (error) {
        console.error(error);
        throw error;
    }

};