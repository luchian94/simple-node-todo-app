import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Todo} from "./models/Todo.model";

class App {

    public express: express.Application;

    todos: Todo[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.todos = [
            {
                id: 1,
                title: 'Testing',
                description: 'Test new features'
            },
            {
                id: 2,
                title: 'Publish production',
                description: 'Publish app in production'
            }
        ];
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
            res.json(this.todos);
        });

        this.express.get("/todo/:todoId", (req, res, next) => {
            console.log("url:::::::" + req.url);
            const todo = this.todos.find( t => t.id === parseInt(req.params.todoId, 10) );
            res.json(todo);
        });

        this.express.post("/todo", (req, res, next) => {
            console.log("url:::::::" + req.url);
            this.todos.push(req.body);
            res.json(this.todos);
        });

        this.express.use('*', (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;
