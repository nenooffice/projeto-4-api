console.log("Loading server...");
require("dotenv").config({ path: "../.env" });
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const connect = require("./conn.db.js");


const app = express();
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getRoutes(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)
  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getRoutes(path.join(dirPath, file), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, file))
    }
  })
  return arrayOfFiles
}

const routes = getRoutes('./routes').map((filePath) => {
  const parsed = path.parse(filePath)
  const file = { 
    path: path.normalize(parsed.dir.replace(path.join(process.cwd(), 'routes'), '/')),
    method: parsed.name.split('.').pop(),
    name: parsed.name.split('.')[0],
    run: require(filePath)
  }
  file.path = file.path.replace(/(\\)/, '/').replace(/\[(\w*)\]/, (_, name) => `:${name}`)
  file.name = file.name.replace(/(\\)/, '/').replace(/\[(\w*)\]/, (_, name) => `:${name}`)
  return file
})

routes.forEach(route => {
  let route_path = ["index", "root"].includes(route.name) ? route.path : path.join(route.path, route.name);
  while(route_path.match(/(\\)/)) route_path = route_path.replace(/(\\)/, "/");
  if (route.run) try { app[route.method](route_path, route.run) } catch (e) { console.error(e.message) }
  return console.log(`"${route_path}" endpoint added (${route.method.toUpperCase()})`);
})

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
    method: req.method,
    path: req.path,
    available_endpoints: routes.map(route => `${route.method.toUpperCase()} ${path.join(route.path, route.name)}`)
  });
})

const PORT = process.env.PORT || 8080;

connect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})