import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

const TrackSettingsMenu = ({
  control,
  menus,
  id,
}: {
  control: React.ReactElement;
  id: string;
  menus: Array<{ label: string } & { [k: string]: any }>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleButtonClick");
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };

  return (
    <React.Fragment>
      {React.cloneElement(control, {
        type: 'button',
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
        ref: buttonRef,
        'aria-controls': isOpen ? id : undefined,
        'aria-expanded': isOpen || undefined,
        'aria-haspopup': 'menu',
      })}
      <Menu
        // actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        // components={{ Root: Popper, Listbox }}
        // componentsProps={{ root: { placement: 'bottom-end' }, listbox: { id } }}
      >
        {menus.map(({ label, active, ...item }) => {
          const menuItem = (
            <MenuItem classes={{selected: active}} {...item}>
              {label}
            </MenuItem>
          );
          if (item.href) {
            return (
              <li key={label} role="none">
                {React.cloneElement(menuItem, { component: 'a' })}
              </li>
            );
          }
          return React.cloneElement(menuItem, { key: label });
        })}
      </Menu>
    </React.Fragment>
  );
};

export default TrackSettingsMenu;
