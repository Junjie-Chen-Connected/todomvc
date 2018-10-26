import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

const defaultState = {
  todos: ["foo", "bar"],
};

describe('App', () => {

  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('when a new item is added', () => {
    const newItem = 'new todo';

    beforeAll(() => {
      wrapper.setState(defaultState);      
      const onSubmitDelegate = wrapper.find('InputBox').prop('onSubmit');
      onSubmitDelegate(newItem);
    })

    it('should be updated in state', () => {      
      expect(wrapper.state('todos')).toContain(newItem);
    });

    it('should render the newly added item', () => {
      expect(wrapper.find('li')).toHaveLength(3);
      expect(wrapper.find('li').at(2).text()).toEqual('new todo');
    });
  })
});