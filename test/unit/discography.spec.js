import test from 'ava';
import { shallow, mount } from 'avoriaz';
import moxios from 'moxios';
import discography from '../../src/js/components/discography.vue'

function calc(num) {
  return new Promise(resolve => {
    resolve(num * num);
  });
}

test('render h3' ,(t) => {
  global.label = 'テスト';
  const vm = mount(discography);
  t.deepEqual(vm.find('h3')[0].text(), global.label);
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

test('非同期の書き方', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar')
});
