import { Application } from "express";
import configKeys from "../../config";

const port = configKeys.SERVER_PORT;

const serverConfig = ( app: Application ) => {
    app.listen( port, () => {
        console.log(`Server started running on port ${port}`)
    })
}

export default serverConfig;