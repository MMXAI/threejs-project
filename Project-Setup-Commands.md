# Three.js Tutorial For Absolute Beginners

- source: Youtube @Wael Yasmina

## Project Setup

```bash
npm init -y
npm install --save-dev parcel
npm install --save three
npx parcel ./src/index.html
```

or at anytime you can also use **Vite**

```bash
npm install --save-dev vite
npx vite serve ./src
```

instead of running the below command every time

```bash
npx vite serve ./src
```

you can add this to **package.json**

```json
"scripts": {
  "dev": "vite serve ./src"
},
```

now you only need to run

```bash
npm run dev
```
