import * as React from 'react';
import { Box, StyledOcticon, Text } from '@primer/components';
import { ShieldIcon } from '@primer/octicons-react';
import { ApolloError } from '@apollo/client';

interface ErrorProps {
  error: ApolloError | null;
}

export function ErrorMessage({ error }: ErrorProps) {
  console.error(error);
  return (
    <Box display="flex" alignItems="center">
      <StyledOcticon icon={ShieldIcon} size={20} mr={2} color="icon.danger" />
      <Text fontSize={1} marginBottom={2} marginTop={2}>
        An error occured: {error?.message}
      </Text>
    </Box>
  );
}
