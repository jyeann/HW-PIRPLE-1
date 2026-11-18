const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');
const http = require('node:http');

let server;
test.before(async () => {
  server = spawn('node', ['index.js'], { cwd: __dirname + '/..', env: { ...process.env, NODE_ENV: 'staging' } });
  await new Promise((resolve) => server.stdout.on('data', (d) => /listneing on port 3000/.test(d) && resolve()));
});
test.after(() => server.kill());

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port: 3000, method, path }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, type: res.headers['content-type'], body: data }));
    });
    req.on('error', reject);
    req.end(body);
  });
}

test('returns a JSON welcome message when anything is posted to /hello', async () => {
  const res = await request('POST', '/hello', 'anything at all');
  assert.strictEqual(res.status, 200);
  assert.match(res.type, /application\/json/);
  assert.strictEqual(typeof JSON.parse(res.body).message, 'string');
});

test('returns 404 for an unknown route', async () => {
  assert.strictEqual((await request('POST', '/nope')).status, 404);
});
