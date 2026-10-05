const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/content/image-upload.ts', 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const context = { exports: {} };
vm.runInNewContext(outputText, context);
const { validateImageFile, MAX_IMAGE_BYTES } = context.exports;
test('accepts supported images up to and including 5 MB', () => {
  for (const type of ['image/jpeg', 'image/png', 'image/webp']) {
    assert.equal(validateImageFile({ type, size: MAX_IMAGE_BYTES }), null);
  }
});
test('rejects empty and oversized files', () => {
  for (const size of [0, MAX_IMAGE_BYTES + 1]) assert.notEqual(validateImageFile({ type: 'image/jpeg', size }), null);
});
test('rejects SVG, documents, and unknown MIME types', () => {
  for (const type of ['image/svg+xml', 'application/pdf', '', 'text/html', 'toString']) assert.notEqual(validateImageFile({ type, size: 100 }), null);
});
