import { useRect } from '@reach/rect';
import {
  Tabs as ReachTabs,
  TabList as ReachTabList,
  Tab as ReachTab,
  useTabsContext,
} from '@reach/tabs';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import './tabs.css';

const HORIZONTAL_PADDING = 8;
const AnimatedContext = React.createContext();

const AnimatedTabs = ({ children, ...rest }) => {
  const [activeRect, setActiveRect] = React.useState(null);
  const ref = React.useRef();
  const rect = useRect(ref);

  const top = (activeRect && activeRect.bottom) - (rect && rect.top);
  const width = activeRect && activeRect.width - HORIZONTAL_PADDING * 2;
  const left = (activeRect && activeRect.left) - (rect && rect.left) + HORIZONTAL_PADDING;

  return (
    <AnimatedContext.Provider value={setActiveRect}>
      <ReachTabs {...rest} ref={ref}>
        <div
          className='w-full h-[3px] bg-primary-200 absolute'
          style={{ top }}
        />
        <div
          className={classNames('absolute h-[3px] bg-primary-600 transition-all', {
            'hidden': top === 0,
          })}
          style={{ left, top, width }}
        />
        {children}
      </ReachTabs>
    </AnimatedContext.Provider>
  );
};

AnimatedTabs.propTypes = {
  children: PropTypes.node,
};

const AnimatedTab = ({ index, ...props }) => {
  // get the currently selected index from useTabsContext
  const { selectedIndex } = useTabsContext();
  const isSelected = selectedIndex === index;

  // measure the size of our element, only listen to rect if active
  const ref = React.useRef();
  const rect = useRect(ref, { observe: isSelected });

  // get the style changing function from context
  const setActiveRect = React.useContext(AnimatedContext);

  // callup to set styles whenever we're active
  React.useLayoutEffect(() => {
    if (isSelected) {
      setActiveRect(rect);
    }
  }, [isSelected, rect, setActiveRect]);

  return (
    <ReachTab ref={ref} {...props} />
  );
};

AnimatedTab.propTypes = {
  index: PropTypes.number,
};

const Tabs = ({ items, activeItem }) => {
  const defaultIndex = items.findIndex(({ name }) => name === activeItem);

  const onChange = (selectedIndex) => {
    const item = items[selectedIndex];

    if (typeof item.action === 'function') {
      item.action();
    } else if (item.to) {
      this.context.router.history.push(item.to);
    }
  };

  const renderItem = (item, idx) => {
    const { name, text, href, to, title } = item;

    return (
      <AnimatedTab
        key={name}
        role='button'
        as={href || to ? 'a' : 'button'}
        href={href || to || null}
        title={title}
        index={idx}
      >
        {text}
      </AnimatedTab>
    );
  };

  return (
    <AnimatedTabs onChange={onChange} defaultIndex={defaultIndex}>
      <ReachTabList>
        {items.map((item, i) => renderItem(item, i))}
      </ReachTabList>
    </AnimatedTabs>
  );
};

Tabs.propTypes = {
  activeItem: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tabs;
