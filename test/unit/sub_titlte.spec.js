import test from 'ava';
import subTitle from '../../src/js/components/sub_title.js';

test('subTitle' ,(t) => {
  window.label = 'test';
  const test = subTitle();
  t.is(test, window.label);
});
