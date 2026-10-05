const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/content/managed.ts', 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const sandbox = { exports: {}, URL };
vm.runInNewContext(output, sandbox);
const { blankItem, validUrl, validateItem } = sandbox.exports;
const valid = { ...blankItem, title: 'Example project', category: 'Web app', description: 'A useful product.', technologies: ['React'], order: 2 };
test('accepts a draft with optional images and links omitted', () => assert.equal(validateItem(valid), null));
test('accepts HTTPS storage download links', () => assert.equal(validUrl('https://firebasestorage.googleapis.com/v0/b/example/o/image.png?alt=media&token=example'), true));
test('rejects executable, insecure, relative, and malformed links', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'http://example.com', '/admin', 'not a URL']) {
    assert.equal(validUrl(url), false);
    assert.notEqual(validateItem({ ...valid, link: url }), null);
    assert.notEqual(validateItem({ ...valid, image: url }), null);
  }
});
test('requires names, roles/categories, and descriptions', () => {
  for (const field of ['title', 'category', 'description']) assert.notEqual(validateItem({ ...valid, [field]: '  ' }), null);
});
test('rejects invalid display order', () => {
  for (const order of [-1, 1.5, NaN, Infinity, 10001]) assert.notEqual(validateItem({ ...valid, order }), null);
});
test('enforces text and technology limits', () => {
  assert.notEqual(validateItem({ ...valid, title: 'x'.repeat(121) }), null);
  assert.notEqual(validateItem({ ...valid, description: 'x'.repeat(2001) }), null);
  assert.notEqual(validateItem({ ...valid, technologies: Array(21).fill('React') }), null);
  assert.notEqual(validateItem({ ...valid, technologies: ['x'.repeat(81)] }), null);
});
