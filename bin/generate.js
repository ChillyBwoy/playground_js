const fs = require('fs');
const glob = require('glob');
const path = require('path');
const nunjucks = require('nunjucks');

const ROOT_PATH = path.resolve(__dirname, '..');

const TEMPLATES_PATH = path.join(ROOT_PATH, 'src', 'templates');
const HTML_PATH = path.join(ROOT_PATH, 'src', 'html');

nunjucks.configure(TEMPLATES_PATH, { autoescape: false });

glob(HTML_PATH + '/**/*.html', {}, (err, rawFiles) => {
  const files = rawFiles.reduce((acc, f) => {
    const [name, ext] = f.split('/').slice(-1)[0].split('.');
    return [...acc, { name, ext }];
  }, []);

  const html = nunjucks.render('index.html', { files });

  fs.writeFileSync(path.resolve(HTML_PATH, '_index.html'), html);
});
