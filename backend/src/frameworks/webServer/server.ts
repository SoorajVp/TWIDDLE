import { Application } from "express";
import configKeys from "../../config";
import { Server } from "http";

const port = configKeys.SERVER_PORT;

const serverConfig = ( app: Server ) => {
    app.listen( port, () => {
        console.log(`Server started running on port ${port}`)
    })
}

export default serverConfig;