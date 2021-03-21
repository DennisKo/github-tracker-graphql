import * as React from 'react';
import { RepositorySettings } from 'components/RepositorySettings';
import { Box, Flex } from '@primer/components';
import { useStore } from './store';
import { Issue } from 'components/Issue';
import { IssueList } from 'components/IssueList';

function App() {
  const issueNumber = useStore((state) => state.issueNumber);
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box maxWidth={900} width={1}>
        <RepositorySettings />
        {issueNumber ? <Issue /> : <IssueList />}
      </Box>
    </Flex>
  );
}

export default App;
