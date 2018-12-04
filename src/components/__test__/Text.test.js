import React from 'react';
import { configure, mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

chai.use(chaiEnzyme());
const expect = chai.expect;

configure({ adapter: new Adapter() });

describe('<Black /> component structure and props', () => {
  it('should render Blank', () => {
    expect(1).to.equal(1);
  });
});
