import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import './Dropdown.scss';

export interface DropdownRef {
  open: (event: React.MouseEvent<HTMLDivElement>) => void;
  close: () => void;
}

interface DropdownProps {
  ref: React.RefObject<DropdownRef | null>;
  trigger: ReactNode;
  menu: ReactNode;
  menuOffsetY?: number;
  onOpen?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
}

function Dropdown({
  ref,
  trigger,
  menu,
  onOpen,
  onClose,
  menuOffsetY = 4,
}: DropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);

  const open = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsOpen(true);
      e.preventDefault();
      e.stopPropagation();
      onOpen?.(e);
    },
    [onOpen]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    const rect = menuRef.current.getBoundingClientRect();
    const hasOverflow = rect.left + rect.width > window.innerWidth;
    const windowWidth = window.innerWidth;

    if (hasOverflow) {
      const overflowAmount = rect.left + rect.width - windowWidth;
      const newLeft = overflowAmount + 10; // 10px padding from the right edge

      setMenuLeft(-newLeft);
    }
  }, [isOpen, menuRef]);

  return (
    <div className="ct-dropdown" ref={wrapperRef}>
      <div className="ct-dropdown__trigger" onClick={(e) => open(e)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className="ct-dropdown__menu"
          ref={menuRef}
          style={{ marginTop: menuOffsetY, left: menuLeft }}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
