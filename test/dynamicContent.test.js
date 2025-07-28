const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('loadDynamicContent', () => {
  test('populates #dynamicContent', () => {
    let html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

    // Remove the external script reference which contains incomplete code
    html = html.replace(/<script\s+defer\s+src="script\.js"><\/script>/, '');
    // Remove the form handling script inside the template string to avoid premature closing
    html = html.replace(/<script>\s*const form[\s\S]*?<\/script>/, '');

    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.IntersectionObserver = class {
          constructor() {}
          observe() {}
          unobserve() {}
          disconnect() {}
        };
        // Prevent the original script's timeout from running automatically
        window.setTimeout = () => {};
      }
    });

    dom.window.loadDynamicContent();

    const dynamic = dom.window.document.getElementById('dynamicContent');
    expect(dynamic.innerHTML.trim()).not.toEqual('');
  });
});
