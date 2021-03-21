import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BorderBox, Box, Text } from '@primer/components';
import { ErrorMessage } from 'components/ErrorMessage';
import { IssueDetailsQuery } from './__generated__/IssueDetailsQuery';
import { Comment } from './Comment';
import { IssueHeader } from './IssueHeader';
import { AddComment } from './AddComment';
import { useStore } from '../../store';

export const GET_ISSUE = gql`
  query IssueDetailsQuery($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      id
      issue(number: $number) {
        id
        title
        number
        body
        author {
          login
        }
        createdAt
        lastEditedAt
        state
        comments(first: 20) {
          edges {
            ...IssueCommentFragment
          }
        }
      }
    }
  }
  ${Comment.fragments.comment}
`;

interface IssueProps {
  owner: string;
  number: number;
  name: string;
}

export function Issue() {
  const store = useStore((state) => state);
  const { data, loading, error } = useQuery<IssueDetailsQuery>(GET_ISSUE, {
    variables: {
      name: store.repositoryInfo.name,
      owner: store.repositoryInfo.owner,
      number: store.issueNumber,
    },
  });

  const issue = data?.repository?.issue;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box pb={5}>
      <IssueHeader issue={issue} />
      <BorderBox padding={2} mt={2} bg="bg.grayLight" minHeight={300}>
        <Text as="pre" fontSize={2} whiteSpace="pre-wrap" margin={0} color="bodytext">
          {issue?.body}
        </Text>
      </BorderBox>

      {issue?.comments?.edges?.map((comment) => (
        <Comment comment={comment} key={comment?.node?.id} />
      ))}
      <AddComment issue={issue} />
    </Box>
  );
}
