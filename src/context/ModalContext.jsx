import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [initialService, setInitialService] = useState('');

    const openModal = (service = '') => {
        setInitialService(service);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInitialService('');
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, initialService }}>
            {children}
        </ModalContext.Provider>
    );
};
