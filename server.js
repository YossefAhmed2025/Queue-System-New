const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

let deskNumbers = { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-" };

io.on("connection", (socket) => {
    console.log("📡 عميل متصل");

    socket.on("setNumber", (data) => {
        deskNumbers[data.desk] = data.number;
        io.emit("numberUpdate", data);
    });

    socket.on("getNumbers", () => {
        socket.emit("initNumbers", deskNumbers);
    });
});

http.listen(3000, () => {
    console.log("🚀 السيرفر شغال على http://localhost:3000");
});
