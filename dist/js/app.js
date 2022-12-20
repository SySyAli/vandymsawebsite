"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import mongoose from "mongoose"
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
console.log("Hello World");
app.use(express_1.default.json());
app.use(body_parser_1.default);
app.use((0, cors_1.default)());
app.use(routes_1.default);
console.log("Hello World2");
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
/*
mongoose.connect('mongodb://localhost:27017/admin').then(() =>
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
)
.catch(error => {
throw error
})

*/
