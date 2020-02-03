const fs = require('fs');
const theme = require('./theme-config.json');
const ncp =  require('ncp').ncp;
const THEME_DIR = './theme-src';
const DIST_DIR = './dist';
const SRC_DIR = './src';

(async () => {
  transferCss();
  console.log('CSS DONE');
  transferJs();
  console.log('JS DONE');
  transferAssets();
  console.log('ASSETS DONE');
})();

function transferJs() {
  const jsFile = `${DIST_DIR}/main.js`;
  fs.copyFileSync(jsFile, `${THEME_DIR}/js/main.js`);
}

async function transferAssets() {
  const folders = ['fonts', 'images'];
  for (let i = 0; i < folders.length; i++) {
    await copy(`${DIST_DIR}/${folders[i]}`, `${THEME_DIR}/${folders[i]}`);
  }
}

function copy(from, to){
  return new Promise((resolve, reject) => {
    ncp(from, to, (err) => {
      if (err) reject();
      resolve();
    });
  })
}

function transferCss() {
  const themeData = createThemeOptions(theme);
  const source = fs.readFileSync(`${DIST_DIR}/css/main.rest.css`);

  const data = `${themeData}

  /* style-transfer output */
  
  ${source}
`;

  try {
    fs.writeFileSync(`${THEME_DIR}/style.css`, data);
    fs.copyFileSync(`${DIST_DIR}/css/main.critical.css`, `${THEME_DIR}/style.critical.css`);
  } catch (err) {
    console.error(err);
  }

  function createThemeOptions(theme) {
    const keys = Object.keys(theme);
    return '/*\n' + keys.map((key, index) => {
      return add(key, theme[key]);
    }).join('\n') + '\n*/';

    function add(key, value) {
      return `${key}: ${value}`;
    }
  }

}