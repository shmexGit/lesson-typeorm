export declare const config: import("ts-dotenv").EnvType<{
    NODE_ENV: ("production" | "development")[];
    DB_HOST: StringConstructor;
    DB_PORT: NumberConstructor;
    DB_USERNAME: StringConstructor;
    DB_PASSWORD: StringConstructor;
    DB_NAME: StringConstructor;
    DB_SYNCHRONIZE: BooleanConstructor;
}>;
