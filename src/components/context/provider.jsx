import { useRef, useState } from 'react';
import { Context } from './context';

export function Provider({ children }) {
  const smartphoneRef = useRef();
  const pcLeftRef = useRef();
  const pcRightRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [destiny, setDestiny] = useState(0);

  const value = {
    smartphoneRef,
    pcLeftRef,
    pcRightRef,
    modalOpen,
    setModalOpen,
    destiny,
    setDestiny,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
