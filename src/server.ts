import  Express from "express";

import { taskRoutes } from "./routes/taskRoutes.js";

const app = Express()
const PORT = 3333

app.use(Express.json());

app.use(taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})