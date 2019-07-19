// const express = require('express')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app
//   .prepare()
//   .then(() => {
//     const server = express()

//     server.get('/', (req, res) => {
//       return handle(req, res)
//     })

//     server.get('*', (req, res) => {
//       return handle(req, res)
//     })

//     server.listen(3000, err => {
//       if (err) throw err
//       console.log('> Ready on http://localhost:3000')
//     })
//   })
//   .catch(ex => {
//     console.error(ex.stack)
//     process.exit(1)
// })


const { createServer } = require('http');
const next = require("next");
const { parse } = require ("url");

// tslint:disable-next-line
const pathMatch = require("path-match");
// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const matches = [
  { route: route("/confirmsignup/:id"), page: "/confirmsignup" },
];

app.prepare().then(() => {
  createServer((req, res) => {
    // @ts-ignore
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    let hasMatch = false;

    for (const match of matches) {
      const params = match.route(pathname);
      if (params) {
        app.render(req, res, match.page, Object.assign(params, query));
        hasMatch = true;
        break;
      }
    }
    if (!hasMatch) {
      handle(req, res, parsedUrl);
    }
    // @ts-ignore
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});