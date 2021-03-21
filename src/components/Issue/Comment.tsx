import * as React from 'react';
import { gql } from '@apollo/client';
import { Box, PointerBox, Text } from '@primer/components';
import { formatDistance } from 'date-fns';
import { IssueCommentFragment } from './__generated__/IssueCommentFragment';

interface CommentProps {
  comment: IssueCommentFragment | undefined | null;
}

export function Comment({ comment }: CommentProps) {
  return (
    <Box mt={4}>
      <Text color="text.grayLight" fontSize="13px">
        <Text fontWeight="bold">{comment?.node?.author?.login}</Text> commented{' '}
        {formatDistance(new Date(comment?.node?.createdAt), new Date(), { addSuffix: true })}
      </Text>
      <PointerBox mt={2} p={2} minHeight={75} bg="bg.grayLight" caret="top-left">
        <Text as="pre" fontSize={2} whiteSpace="pre-wrap" margin={0} color="bodytext">
          {comment?.node?.body}
        </Text>
      </PointerBox>
    </Box>
  );
}

Comment.fragments = {
  comment: gql`
    fragment IssueCommentFragment on IssueCommentEdge {
      node {
        author {
          login
        }
        body
        id
        createdAt
      }
    }
  `,
};
