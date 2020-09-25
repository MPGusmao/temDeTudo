const express = require('express');
const logger = require('./logger')();
const path = require('path');
const fs = require('fs');
// routes
// const template = require('./template');

module.exports = (app, dirname) => {
    const { Router } = express;
    const router = Router();
    const port = process.env.PORT || 3000;

    app.use('/api', router);

    // Serve static files
    app.use('/', express.static(path.join(dirname, 'client', 'dist')));


    // server init
    app.listen(port, () => logger.info(`Server on at ${port}`));
};
