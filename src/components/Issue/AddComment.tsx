import * as React from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { Box, ButtonPrimary, Flex } from '@primer/components';
import { ErrorMessage } from 'components/ErrorMessage';
import { Comment } from './Comment';
import { GET_ISSUE } from './Issue';
import { useStore } from '../../store';

const ADD_COMMENT = gql`
  mutation AddComment($id: ID!, $body: String!) {
    addComment(input: { subjectId: $id, body: $body }) {
      commentEdge {
        ...IssueCommentFragment
      }
    }
  }
  ${Comment.fragments.comment}
`;

export function AddComment({ issue }: any) {
  const repositoryInfo = useStore((state) => state.repositoryInfo);
  const [commentBody, setCommentBody] = React.useState('');
  const [mutationError, setMutationError] = React.useState<ApolloError | null>(null);
  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setCommentBody('');
    },
    onError: (e) => {
      setMutationError(e);
    },
    refetchQueries: [
      {
        query: GET_ISSUE,
        variables: {
          name: repositoryInfo.name,
          owner: repositoryInfo.owner,
          number: issue.number,
        },
      },
    ],
  });
  const handleCommentClick = () => {
    addComment({ variables: { id: issue.id, body: commentBody } });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value);
  };
  return (
    <Box width="100%" mt={3}>
      <Box>Write a comment:</Box>
      {mutationError && <ErrorMessage error={mutationError} />}
      <textarea
        style={{ width: '100%', minHeight: '150px' }}
        value={commentBody}
        onChange={handleCommentChange}
      />
      <Flex justifyContent="flex-end">
        <Box>
          <ButtonPrimary onClick={handleCommentClick}>Comment</ButtonPrimary>
        </Box>
      </Flex>
    </Box>
  );
}
