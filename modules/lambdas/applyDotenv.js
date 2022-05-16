const applyDotenv = dotenv => {
    dotenv.config()
    const oEnv = process.env;
    return {
        mongoUri: oEnv.MONGO_URI, 
        port: oEnv.PORT, 
        jwtSecret: oEnv.JWT_SECERT, 
        origin: oEnv.ORIGIN,
        appUrl: oEnv.appUrl
    }
}
export default applyDotenv