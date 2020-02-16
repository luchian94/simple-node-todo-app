import * as express from 'express';
import * as bodyParser from 'body-parser';
import MySQL from "./mysql";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {

        this.express.get('/', (req, res, next) => {
            res.send("Typescript App works!!!");
        });

        this.express.get("/todo", (req, res, next) => {
            console.log("url:::::::" + req.url);
            const query = `SELECT * FROM todo`;
            MySQL.query(query, (err:Error, results:Object[])=>{
                if (err) {
                    res.status(400)
                        .send({
                            success: false,
                            status: res.status
                        });
                } else {
                    res.status(200)
                        .send({
                            success: true,
                            status: res.status,
                            todo: results
                        });
                }
            });
        });

        this.express.get("/todo/:todoId", (req, res, next) => {
            console.log("url:::::::" + req.url);
            const query = `SELECT * FROM todo WHERE id=${MySQL.escape(req.params.id)}`
            MySQL.query(query, (err:Error, result:Object[]) => {
                if(err){
                    res.status(200)
                        .send({
                            success: false,
                            status: res.status
                        });
                }
                else{
                    res.status(200)
                        .send({
                            success: true,
                            status: res.status,
                            todo: result
                        });
                }
            });
        });

        this.express.post("/todo", (req, res, next) => {
            console.log("url:::::::" + req.url);
            // TODO: query inserimento
        });

        this.express.use('*', (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;
