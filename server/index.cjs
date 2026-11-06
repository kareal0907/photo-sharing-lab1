const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const modelPath = path.join(__dirname, "..", "src", "modelData", "models.js");
const source = fs.readFileSync(modelPath, "utf8").replace(["export", "default", "models"].join(" ") + ";", "module.exports = models;");
const modelModule = { exports: {} };
vm.runInNewContext(source, { module: modelModule, exports: modelModule.exports, console });
const models = modelModule.exports;

const sendJson = (response, status, body) => {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
  response.end(JSON.stringify(body));
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://localhost:3333");
  const parts = requestUrl.pathname.split("/").filter(Boolean);
  if (request.method !== "GET") return sendJson(response, 405, { error: "Only GET is supported" });
  if (requestUrl.pathname === "/test/info") return sendJson(response, 200, models.schemaInfo());
  if (requestUrl.pathname === "/user/list") return sendJson(response, 200, models.userListModel());
  if (parts[0] === "user" && parts[1]) {
    const user = models.userModel(parts[1]);
    return user ? sendJson(response, 200, user) : sendJson(response, 404, { error: "User not found" });
  }
  if (parts[0] === "photosOfUser" && parts[1]) return sendJson(response, 200, models.photoOfUserModel(parts[1]));
  return sendJson(response, 404, { error: "Endpoint not found" });
});
server.listen(3333, () => console.log("Photo Sharing API running at http://localhost:3333"));

