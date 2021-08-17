import { useContext } from 'react';
import { MainPageContext } from '../stores';

const useMainPage = () => {
    return useContext(MainPageContext);
};

export default useMainPage;