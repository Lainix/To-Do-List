
Equipo 8@Laboratoria MINGW64 ~/Desktop/to do
1) $ create-react-app list

Creating a new React app in C:\Users\Equipo 8\Desktop\to do\list.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...


> uglifyjs-webpack-plugin@0.4.6 postinstall C:\Users\Equipo 8\Desktop\to do\list\node_modules\uglifyjs-webpack-plugin
> node lib/post_install.js

+ react-scripts@1.1.4
+ react-dom@16.4.2
+ react@16.4.2
added 1316 packages in 51.52s

Success! Created list at C:\Users\Equipo 8\Desktop\to do\list
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd list
  npm start

Happy hacking!

Equipo 8@Laboratoria MINGW64 ~/Desktop/to do
$ npm start
npm ERR! path C:\Users\Equipo 8\Desktop\to do\package.json
npm ERR! code ENOENT
npm ERR! errno -4058
npm ERR! syscall open
npm ERR! enoent ENOENT: no such file or directory, open 'C:\Users\Equipo 8\Desktop\to do\package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Equipo 8\AppData\Roaming\npm-cache\_logs\2018-08-20T16_41_38_657Z-debug.log

Equipo 8@Laboratoria MINGW64 ~/Desktop/to do
2) $ cd list

Equipo 8@Laboratoria MINGW64 ~/Desktop/to do/list
3) $ npm start

> list@0.1.0 start C:\Users\Equipo 8\Desktop\to do\list
> react-scripts start

Starting the development server...

Compiled successfully!

You can now view list in the browser.

  http://localhost:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.

Failed to compile.

./src/App.js
Module build failed: Error: ENOENT: no such file or directory, open 'C:\Users\Equipo 8\Desktop\to do\list\src\App.js'


4) borrar los src y dejar el index.js
vamos a firebase
no) npm install --save-dev firebase
abrimos otra consola para poner el siguiente comando
5) npm install --save firebase
importamos Firebase en index.js
creamos una carpeta app.js
importamos React en app.js
el archivo creado siempre tiene que iniciar con mayuscula