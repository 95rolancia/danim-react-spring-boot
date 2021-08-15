import { useContext } from 'react';
import { StoryContext } from '../stores';

const useStory = () => {
    return useContext(StoryContext);
};

export default useStory;