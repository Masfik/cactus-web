import express from "express";
import config from '../nuxt.config';
import { Nuxt, Builder } from "nuxt";

const app = express();

config.dev = process.env.NODE_ENV !== 'production';

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    console.log(host);

    await nuxt.ready();

    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`);
}

start();
