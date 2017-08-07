import test from 'ava';
import Vue from 'vue';
import sinon from 'sinon';
import { shallow, mount } from 'avoriaz';
import axios from 'axios';
import discography from '../../src/js/components/discography.vue'


test.beforeEach(t => {
  window.label = 'テスト';
  window.globalText = 'ここはキャッチです。';
  window.document.body.innerHTML = '<div id="component"></div><section id="btn-to-top">button</section>';
});

test.afterEach(t => {
  delete window.label;
  delete window.globalText;
  window.document.body.innerHTML = '';
});

test('render h3' ,(t) => {
  const wrapper = mount(discography);
  t.deepEqual(wrapper.find('h3')[0].text(), window.label);
});

test.serial('sinon', async t => {
  const respData = {
    "records": 'test'
  };
  let sandbox;
  sandbox = sinon.sandbox.create();
  const resolved = new Promise((r) => r({ data: respData }));
  sandbox.stub(axios, 'get').returns(resolved);
  const wrapper = mount(discography);
  const rep = await wrapper.vm.fetchData();

  t.is(rep, 'test');
  sandbox.restore();
});

test.serial('axios error', async t => {

  let sandbox;
  sandbox = sinon.sandbox.create();
  const rejected = new Promise((_, r) => r());
  sandbox.stub(axios, 'get').returns(rejected);

  const wrapper = mount(discography);
  const rep = await wrapper.vm.fetchData();
  t.is(rep, 'error');
  sandbox.restore();
});

test('ava de vue mount' ,(t) => {
  const Constructor = Vue.extend(discography);
  const vm = new Constructor().$mount();
  t.is(vm.$el.querySelector('h1').textContent, 'ava-avoriaz-vuejs');
});

test('Access to objects outside the component' ,(t) => {
  const Constructor = Vue.extend(discography);
  const vm = new Constructor().$mount('#component');
  t.true(document.querySelector('#btn-to-top').classList.contains('hide'));
});



//おまけ async/await functions
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

