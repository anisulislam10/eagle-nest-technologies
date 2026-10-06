const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/content/quotations.ts', 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const context = { exports: {} };
vm.runInNewContext(outputText, context);
const { validateQuotation } = context.exports;
const valid = { firstName: 'Test', lastName: 'Visitor', email: 'visitor@example.com', service: 'Web App Development', date: '', time: '', timeZone: 'Asia/Karachi', message: 'Please quote for a customer portal.' };
test('accepts a request without an optional meeting preference', () => assert.equal(validateQuotation(valid), null));
test('accepts a date and time with a timezone', () => assert.equal(validateQuotation({ ...valid, date: '2026-12-01', time: '15:30' }), null));
test('requires contact details, a supported service, and project requirements', () => {
  for (const field of ['firstName', 'lastName', 'email', 'service', 'message']) assert.notEqual(validateQuotation({ ...valid, [field]: '' }), null);
  assert.notEqual(validateQuotation({ ...valid, service: 'unknown' }), null);
  assert.notEqual(validateQuotation({ ...valid, email: 'invalid' }), null);
});
test('limits lengths', () => {
  for (const [field, size] of [['firstName', 81], ['lastName', 81], ['email', 255], ['message', 5001], ['timeZone', 101]]) assert.notEqual(validateQuotation({ ...valid, [field]: 'x'.repeat(size) }), null);
});
test('rejects invalid dates, times, and partial preferences', () => {
  for (const date of ['2026-02-30', 'bad', '2026-13-01']) assert.notEqual(validateQuotation({ ...valid, date, time: '12:00' }), null);
  for (const time of ['24:00', '10:99', 'bad']) assert.notEqual(validateQuotation({ ...valid, date: '2026-12-01', time }), null);
  assert.notEqual(validateQuotation({ ...valid, date: '2026-12-01' }), null);
  assert.notEqual(validateQuotation({ ...valid, time: '12:00' }), null);
});
