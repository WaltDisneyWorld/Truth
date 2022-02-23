import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from '@reach/menu-button';
import { positionDefault, positionRight } from '@reach/popover';
import PropTypes from 'prop-types';
import React from 'react';

import './menu.css';

const MenuList = (props) => (
  <MenuPopover position={props.position === 'left' ? positionDefault : positionRight}>
    <MenuItems
      onKeyDown={(event) => event.nativeEvent.stopImmediatePropagation()}
      className='py-1 bg-white rounded-lg shadow-menu'
      {...props}
    />
  </MenuPopover>
);

MenuList.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
};

const MenuDivider= () => <hr />;

export { Menu, MenuButton, MenuDivider, MenuItems, MenuItem, MenuList, MenuLink };
