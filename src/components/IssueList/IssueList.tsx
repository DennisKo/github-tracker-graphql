import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RepositoryIssuesListQuery } from './__generated__/RepositoryIssuesListQuery';
import { IssuePreview } from './IssuePreview';
import { ErrorMessage } from 'components/ErrorMessage';
import { useStore } from '../../store';

const GET_REPOSITORY_ISSUES = gql`
  query RepositoryIssuesListQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      issues(first: 5) {
        edges {
          node {
            ...IssuePreviewFragment
          }
        }
      }
    }
  }
  ${IssuePreview.fragments.issue}
`;

export function IssueList() {
  const repositoryInfo = useStore((state) => state.repositoryInfo);
  const { data, loading, error } = useQuery<RepositoryIssuesListQuery>(GET_REPOSITORY_ISSUES, {
    variables: { name: repositoryInfo.name, owner: repositoryInfo.owner },
    nextFetchPolicy: 'network-only',
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const issues = data?.repository?.issues?.edges;
  if (issues && issues?.length < 1) {
    return <div>No issues yet.</div>;
  }
  return (
    <div>
      {issues?.map((issue) => (
        <IssuePreview issue={issue?.node} key={issue?.node?.id} />
      ))}
    </div>
  );
}
