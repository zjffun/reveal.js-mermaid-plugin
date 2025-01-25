const { rollup } = require("rollup");
const { terser } = require("rollup-plugin-terser");
const babel = require("@rollup/plugin-babel").default;
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve").default;

const gulp = require("gulp");
const connect = require("gulp-connect");

const yargs = require("yargs");
const glob = require("glob");
const qunit = require("node-qunit-puppeteer");

const root = yargs.argv.root || ".";
const port = yargs.argv.port || 8000;
const host = yargs.argv.host || "localhost";

// Prevents warnings from opening too many test pages
process.setMaxListeners(20);

const babelConfig = {
  babelHelpers: "bundled",
  ignore: ["node_modules"],
  compact: false,
  extensions: [".js", ".html"],
  plugins: ["transform-html-import-to-string"],
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "usage",
        modules: false,
      },
    ],
  ],
};

let cache = {};

// Creates a UMD and ES module bundle for each of our
// built-in plugins
gulp.task("plugins", () => {
  return Promise.all(
    [
      {
        name: "RevealMermaid",
        input: "./plugin/mermaid/plugin.js",
        output: "./plugin/mermaid/mermaid",
      },
    ].map((plugin) => {
      return rollup({
        cache: cache[plugin.input],
        input: plugin.input,
        plugins: [
          resolve(),
          commonjs(),
          babel({
            ...babelConfig,
            ignore: [/node_modules\/(?!(highlight\.js|marked)\/).*/],
          }),
          terser(),
        ],
      }).then((bundle) => {
        cache[plugin.input] = bundle.cache;
        bundle.write({
          file: plugin.output + ".esm.js",
          name: plugin.name,
          format: "es",
          inlineDynamicImports: true,
        });

        bundle.write({
          file: plugin.output + ".js",
          name: plugin.name,
          format: "umd",
          inlineDynamicImports: true,
        });
      });
    })
  );
});

gulp.task("build", gulp.series("plugins"));

gulp.task("qunit", () => {
  let serverConfig = {
    root,
    port: 8009,
    host: "localhost",
    name: "test-server",
  };

  let server = connect.server(serverConfig);

  let testFiles = glob.sync("test/*.html");

  let totalTests = 0;
  let failingTests = 0;

  let tests = Promise.all(
    testFiles.map((filename) => {
      return new Promise((resolve, reject) => {
        qunit
          .runQunitPuppeteer({
            targetUrl: `http://${serverConfig.host}:${serverConfig.port}/${filename}`,
            timeout: 60000,
            redirectConsole: false,
            puppeteerArgs: ["--allow-file-access-from-files"],
          })
          .then((result) => {
            if (result.stats.failed > 0) {
              console.log(
                `${"!"} ${filename} [${result.stats.passed}/${
                  result.stats.total
                }] in ${result.stats.runtime}ms`.red
              );
              // qunit.printResultSummary(result, console);
              qunit.printFailedTests(result, console);
            } else {
              console.log(
                `${"✔"} ${filename} [${result.stats.passed}/${
                  result.stats.total
                }] in ${result.stats.runtime}ms`.green
              );
            }

            totalTests += result.stats.total;
            failingTests += result.stats.failed;

            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
      });
    })
  );

  return new Promise((resolve, reject) => {
    tests
      .then(() => {
        if (failingTests > 0) {
          reject(new Error(`${failingTests}/${totalTests} tests failed`.red));
        } else {
          console.log(`${"✔"} Passed ${totalTests} tests`.green.bold);
          resolve();
        }
      })
      .catch(() => {
        reject();
      })
      .finally(() => {
        server.close();
      });
  });
});

gulp.task("test", gulp.series("qunit"));

gulp.task("reload", () => gulp.src(["*.html"]).pipe(connect.reload()));

gulp.task("serve", () => {
  connect.server({
    root: root,
    port: port,
    host: host,
    livereload: true,
  });

  gulp.watch(["*.html"], gulp.series("reload"));

  gulp.watch(["plugin/**/plugin.js"], gulp.series("plugins", "reload"));
});
