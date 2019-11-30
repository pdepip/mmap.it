class Accessor {
    // proprties
    env: object | undefined;

    constructor(appEnvironment: object | undefined) {
        this.env = appEnvironment;
        // this.windowManager = new WindowManager()
    }
}

export { Accessor };
