import { MetricsManager } from './metricsManager';
class Accessor {
    // proprties
    env: object | undefined;
    metrics: MetricsManager 

    constructor(appEnvironment: object | undefined) {
        this.env = appEnvironment;
        this.metrics = new MetricsManager()
        // this.windowManager = new WindowManager()
    }
}

export { Accessor };
