import test from 'ava';
import Vue from 'vue';
import { shallow, mount } from 'avoriaz';
import moxios from 'moxios';
import discography from '../../src/js/components/discography.vue'

function calc(num) {
  return new Promise(resolve => {
    resolve(num * num);
  });
}

test.beforeEach(t => {
  global.label = 'テスト';
});

test.afterEach(t => {
  delete global.label
});

test('render h3' ,(t) => {
  const vm = mount(discography);
  t.deepEqual(vm.find('h3')[0].text(), global.label);
  delete global.label;
});

test.cb('moxios', (t) => {
  moxios.install();
  const vm = mount(discography);

  moxios.wait(function () {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        "records": [
          {"year": "2012", "name": "Revelator"}
        ]
      }

    }).then(function () {
      const listText = vm.find('li')[0].text();
      t.is(listText, '2012-Revelator');
      t.end()
    });
  });

  vm.find('button')[0].trigger('click');
});

test('ava de vue mount' ,(t) => {
  const Constructor = Vue.extend(discography);
  const vm = new Constructor().$mount();
  t.is(vm.$el.querySelector('h1').textContent, 'ava-avoriaz-vuejs');
});


// sample async/await functions
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
async function add2(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

test('async/await', async t => {
  const v = await add2(10);
  t.is(v, 60)
});

