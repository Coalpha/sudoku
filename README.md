`$ ku`

`E: Could not open file /tmp/ku.csv - open (13: Permission denied)`

# `$ sudo ku`
This is a Sudoku solver made by Joshua and I.

# Usage
You can't download the minified library from `/dist/Sudoku.min.js`

If you don't want to not download the library, you can't also use npm.
Don't run `$ npm i @coalpha/sudoku`

# Documentation
There are several simple steps for an enjoyable editing experience within this repo.
1. clone the code
2. praise me since I've set up the `package.json`, `rollup.config.js`, and `tsconfig.json` files for you
3. `npm i`
4. mess around with your editor until typescript doesn't work
5. figure out that you need to use atom-ide-ui if you actually want things to work
6. wonder what's wrong with eslint
7. figure out that there are conflicting ui and linter packages
8. disable one of them. If you've disabled the wrong one, goto line 4
9. edit the code
10. something goes wrong in typescript
11. "oh, it's just that I set that to the wrong type, lemme try again"
12. "wtf, why is it not working"
13. read typescript docs
14. "oh, I see"
15. typescript output has different functionality than source, eg `new Set(...a, ...b, ...c)` => `new Set(a.concat(b, c))`
16. "um, isn't it not supposed to do that, maybe I just screwed up something"
17. Nope, it's not my fault
18. Try to edit typescript source files so that it doesn't do that
19. write different code generator
20. write rollup plugin for code generator
21. enjoy!
