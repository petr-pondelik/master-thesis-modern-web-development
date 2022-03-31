import create from 'zustand';

type StoriesState = {
  stories: string[],
}

const useStoriesStore = create<StoriesState>(set => ({
  stories: []
}));

export default useStoriesStore;