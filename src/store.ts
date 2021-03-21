import create from 'zustand';

export interface RepositoryInfo {
  owner: string;
  name: string;
}

type State = {
  repositoryInfo: RepositoryInfo;
  issueNumber: number | undefined;
  setIssueNumber: (issueNumber: number | undefined) => void;
  setRepositoryInfo: (repository: RepositoryInfo) => void;
};

export const useStore = create<State>((set) => ({
  repositoryInfo: { name: 'github-tracker', owner: 'dennisko' },
  issueNumber: undefined,
  setIssueNumber: (issueNumber) => set({ issueNumber }),
  setRepositoryInfo: (repositoryInfo) => set({ repositoryInfo }),
}));
