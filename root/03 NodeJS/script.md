# NPM 
1. What is it? https://www.npmjs.com Fun fact about the name
2. What is `package.json`? R:// It contains the metadata of the project: name, dependencies, scripts, version.
Ex:
Where does it comes?
https://www.npmjs.com/package/@tensorflow/tfjs
From:
https://github.com/tensorflow/tfjs/blob/tfjs_2.0.0/tfjs/package.json
3. npm init (https://editor.swagger.io/) (Go to start project with swagger and build it)
4. Scripts: natives (npm start) and non-natives (npm run lint).
5. How to create an script? Ej: lint, build, test:watch, dev:check
6. Hooks: pre, pos. "preTest" (https://docs.npmjs.com/misc/scripts)
7. Advice: Less scripts, better the project. Less complexity. Which ones are necessary? Linter, build, test, start, test:watch, ¿dev:check?, migrate?
8. Advice: Make it work in any system (sh ...)
9. Dependencies: devDependencies, dependencies, optionalDependencies, peerdependencies, bundleddependencies (https://docs.npmjs.com/files/package.json#dependencies)
10. What's the difference? How to install only prod? `npm i --prod`

>By default NodeJS install the dep and push it to the `package.json` file with `npm i` <br>
devDependencies: `npm i -d` <br>
Old versions requires you to specify the save in the `package.json` file. <br>
With  `npm install --save` or `npm install --save-dev` <br>
Dev ex: testing (jest, sinon), types (@types/...)<br>
Prd: express, dotenv...

11. Versions: (https://docs.npmjs.com/about-semantic-versioning)
> 1.2.3
> * Major: No retro compatibility.
> * Minor: new release, keep retro compatiblity and new features
> * Path: Bug fixed, increment by 1 for each patch
> * Patch releases: 1.0 or 1.0.x or ~1.0.4
> * Minor releases: 1 or 1.x or ^1.0.4
> * Major releases: * or x <br>
> Fun fact: Some project follow practice of always use last version, no matter what. Some projects fix the version<br>
> **Discussion**: What's a better practice? Depends on money.  Keep updates over minor versions is ok. Follow always update to major versions is dangerous but  cool

12. Fields: (https://docs.npmjs.com/files/package.json)
> * bin (Executable )
> * main: Important. Only for libraries
> * version: Important.
> * name: Important.
> * repository: Important.
> * engines: Important.
> * os: forbid SO to execute the package

13. Namespaces:
> Ex: https://www.npmjs.com/package/@tensorflow

14. Registry: 
> Where are the dependencies? Here!.
> Usually our clients use their own registries, to forbid versions, improve latency our add private libraries. @client/logger, @client/migrator, @client/health-check

15. Cousins:
> - yarn  (https://yarnpkg.com/). Is this better? Why? People always say "security" but they don't know why
> - pnpm (https://pnpm.js.org/)
> - Advice: Use a popular one and well supported. Yarn or npm are good options. This author prefer npm for consistency.

16. Editorconfig (https://editorconfig.org/) (editorconfig.editorconfig)
17. gitignore (https://www.toptal.com/developers/gitignore) (Because GIT is obligatory, right?)
18. IDE (VsCode, Sublime, Atom, NotePad, TextEdit)
19. jsconfig.json (https://code.visualstudio.com/docs/languages/jsconfig)
20. Code Spell Checker, create-index,  ESLint, GitLens, whtouche.vscode-js-console-utils, snippets, prettier
linter)


Homework:
1. Implement the swagger.yml behavior with no http libraries like express. Implement google login and upload file (And save it to the local folder) (You can use multer if you want)

Pointhief:
1. Find a bug in another implementation
