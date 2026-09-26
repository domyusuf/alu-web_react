import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('<BodySectionWithMarginBottom />', () => {
  it('renders BodySection and passes all props to it', () => {
    const child = <p>test children node</p>;
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        {child}
      </BodySectionWithMarginBottom>
    );
    const bodySection = wrapper.find(BodySection);

    expect(bodySection).toHaveLength(1);
    expect(bodySection.prop('title')).toEqual('test title');
    expect(bodySection.prop('children')).toEqual(child);
    expect(wrapper.find('.bodySectionWithMargin')).toHaveLength(1);
  });
});
