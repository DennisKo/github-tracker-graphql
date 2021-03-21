import * as React from 'react';
import { Box, ButtonPrimary, FormGroup, TextInput } from '@primer/components';
import { useStore } from '../../store';

export function RepositorySettings() {
  const store = useStore((state) => state);

  const [owner, setOwner] = React.useState(store.repositoryInfo.owner);
  const [name, setName] = React.useState(store.repositoryInfo.name);

  const handleLoadRepository = () => {
    store.setRepositoryInfo({ owner, name });
    store.setIssueNumber(undefined);
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };
  const handleRepositoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <FormGroup>
      <FormGroup.Label htmlFor="owner">Repository info</FormGroup.Label>
      <TextInput
        aria-label="owner"
        name="owner"
        placeholder="Owner"
        value={owner}
        onChange={handleOwnerChange}
      />
      <Box as="span" marginLeft={2} marginRight={2}>
        /
      </Box>
      <TextInput
        aria-label="Repo name"
        name="repositoryName"
        placeholder="Repo name"
        value={name}
        onChange={handleRepositoryNameChange}
      />
      <ButtonPrimary ml={2} onClick={handleLoadRepository}>
        Set Repository
      </ButtonPrimary>
    </FormGroup>
  );
}
