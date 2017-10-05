import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

test('renders without crashing', t => {
  mount(<App />);
  t.pass();
});
