const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/coach-share.js'), 'utf8');
function setup(navigator) {
  let click; const status = {textContent:'', children:[], replaceChildren(x){this.children=[x]}, appendChild(x){this.children.push(x)}};
  vm.runInNewContext(source,{navigator,URL,location:{href:'https://explore.digiylyfe.com/index-core.html?lang=fr'},document:{addEventListener(_,fn){click=fn},getElementById(){return status},createTextNode(text){return text},createElement(){return {}}}});
  return {status,run:()=>click({target:{closest:()=>({})}})};
}
test('native share uses public profile URL',async()=>{let payload; const x=setup({share:async p=>{payload=p}});await x.run();assert.equal(payload.url,'https://explore.digiylyfe.com/coach-ousmane-dione.html')});
test('without native share copies the link',async()=>{let copied;const x=setup({clipboard:{writeText:async u=>{copied=u}}});await x.run();assert.match(copied,/coach-ousmane-dione.html$/);assert.match(x.status.textContent,/Lien copié/)});
test('denied native share falls back to clipboard',async()=>{let copied;const x=setup({share:async()=>{throw new Error('Denied')},clipboard:{writeText:async u=>{copied=u}}});await x.run();assert.ok(copied)});
test('unavailable clipboard displays clickable link',async()=>{const x=setup({clipboard:{writeText:async()=>{throw new Error('Denied')}}});await x.run();assert.equal(x.status.children[1].href,'https://explore.digiylyfe.com/coach-ousmane-dione.html')});
test('user cancellation does not copy',async()=>{const x=setup({share:async()=>{const e=new Error();e.name='AbortError';throw e},clipboard:{writeText:async()=>{throw new Error('Must not copy')}}});await x.run();assert.equal(x.status.textContent,'');assert.equal(x.status.children.length,0)});
