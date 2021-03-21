import * as React from 'react';
import { gql } from '@apollo/client';
import { Box, Link } from '@primer/components';
import { IssuePreviewFragment } from './__generated__/IssuePreviewFragment';
import { useStore } from '../../store';

interface IssuePreviewProps {
  issue: IssuePreviewFragment | null | undefined;
}

export function IssuePreview({ issue }: IssuePreviewProps) {
  const store = useStore((state) => state);

  const showIssueDetails = () => {
    store.setIssueNumber(issue?.number);
  };

  return (
    <Box>
      <Link mb={1} as="button" onClick={showIssueDetails}>
        {issue?.title}
      </Link>
    </Box>
  );
}

IssuePreview.fragments = {
  issue: gql`
    fragment IssuePreviewFragment on Issue {
      id
      title
      number
    }
  `,
};
