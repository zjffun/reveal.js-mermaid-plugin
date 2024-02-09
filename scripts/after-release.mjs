import fs from "fs";

RegExp.escape = function (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const filePaths = ["../README.md", "../index.html"];

const packageUrl = new URL("../package.json", import.meta.url);

const packageJson = JSON.parse(fs.readFileSync(packageUrl, "utf8").toString());
const name = packageJson.name;
const version = packageJson.version;

for (const filePath of filePaths) {
  const url = new URL(filePath, import.meta.url);
  const content = fs.readFileSync(url, "utf8").toString();

  const regexp = new RegExp(`${RegExp.escape(name)}@\\d+\\.\\d+\\.\\d+`, "g");

  const updatedContent = content.replace(regexp, `${name}@${version}`);

  fs.writeFileSync(url, updatedContent, "utf8");
}
