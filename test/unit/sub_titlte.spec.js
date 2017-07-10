import test from 'ava';
import subTitle from '../../src/js/components/sub_title.js';

test('subTitle' ,(t) => {
  global.label = 'test';
  const test = subTitle();
  t.is(test, global.label);
});
