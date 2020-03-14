const mongoose = require("mongoose")
mongoose.connect(require("./config/config").DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("连接成功");
});
mongoose.connection.once("error", () => {
    console.log("连接失败");
});
module.exports = mongoose;

