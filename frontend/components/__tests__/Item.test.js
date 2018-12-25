import Item from '../Item';
import { shallow } from 'enzyme';
const fakeItem = {
  id: '1',
  title: 'My fake item',
  description: 'My test description',
  price: 1000,
  image: 'https://placekitten.com/400/500',
  largeItem: 'https://placekitten.com/400/500',
};
describe('The item component', () => {
  it('Renders properly', () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.dive().text()).toBe('€10');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    expect(wrapper.find('img').props().src).toBe(fakeItem.image);
    expect(wrapper.find('img').props().alt).toBe(fakeItem.title);
    expect(wrapper.find('.item__description').text()).toBe(
      fakeItem.description
    );
  });
});
