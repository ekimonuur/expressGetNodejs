const express = require('express')
const countryRouter = require("./routers/country")
try {
    //Setup express app
    const app = express();
    const port = 3000;

    app.use(countryRouter);

    app.listen(port, () => {
        console.log(`ExpressGet app listening at http://localhost:${port}`)
    });
} catch (error) {
    console.error(error)
}

