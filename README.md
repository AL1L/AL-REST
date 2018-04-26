# AL-REST
AL-REST is a lightweight class and event based rest server.

## How to use example
To run the code in the [example](./example-app) do these steps
1. Clone repo
2. Run `npm install`
3. Run `npm start`
4. Admire webserver
4. Edit code
5. Repeat steps 3-5

## How to use somewhere else
Follow these steps, I don't care if there's a lot. Maybe I'll make a repo of this example, but I'm lazy :D
1. Create new directory
2. Run `npm init` and follow wizard
    * Set `node src/app.js` as test command
3. Run `npm install git+https://github.com/AL1L/AL-REST.git`
4. Create these directorys
    * src
    * src/endpoints
    * data
5. Create these files
    * src/app.js
    * src/endpoints/hello.js
    * data/server.json

src/app.js: 
```js
import { Server } from "al-rest";

const server = new Server('data/server.js');
server.em.loader.loadDirectory('src/endpoints')
server.start();
```

src/endpoints/hello.js:
```js

import { Url } from "url";
import { Request, Endpoint } from "al-rest";

// The name of the class doesn't matter
export default class HelloEndpoint extends Endpoint { 

    constructor(em) {
        super(em);
        this.meta({
            name: 'Hello',
            desc: 'Hello, World!'
        });
    }

    canHandle(method, url) {
        return url.path === '/';
    }
    
    handle(request) {
        request.res.setMessage('Hello, world!');
    }
}
```

data/server.json:
```json
{
    "host": "localhost",
    "port": 3000
}
```

6. Run `npm run test`
7. Yay!
