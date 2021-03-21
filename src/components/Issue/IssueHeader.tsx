import * as React from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import {
  Button,
  ButtonPrimary,
  Flex,
  Heading,
  TextInput,
  Text,
  StateLabel,
  ButtonDanger,
  Relative,
  Popover,
} from '@primer/components';
import { ErrorMessage } from 'components/ErrorMessage';
import { formatDistance } from 'date-fns';
import { useStore } from '../../store';
import { IssueDetailsQuery_repository_issue } from './__generated__/IssueDetailsQuery';

const UPDATE_ISSUE_TITLE = gql`
  mutation UpdateIssueTitle($id: ID!, $title: String!) {
    updateIssue(input: { id: $id, title: $title }) {
      issue {
        title
        lastEditedAt
        id
      }
    }
  }
`;

const DELETE_ISSUE = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(input: { issueId: $id }) {
      __typename
      clientMutationId
    }
  }
`;

interface IssueHeaderProps {
  issue: IssueDetailsQuery_repository_issue | null | undefined;
}

export function IssueHeader({ issue }: IssueHeaderProps) {
  const setIssueNumber = useStore((state) => state.setIssueNumber);
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [title, setTitle] = React.useState<string | undefined>();
  const [mutationError, setMutationError] = React.useState<ApolloError | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [updateTitle] = useMutation(UPDATE_ISSUE_TITLE, {
    onCompleted: () => {
      setIsEditingTitle(false);
      setMutationError(null);
    },
    onError: (e) => setMutationError(e),
  });
  const [deleteIssue] = useMutation(DELETE_ISSUE, {
    onCompleted: () => {
      setIssueNumber(undefined);
    },
    onError: (e) => {
      setMutationError(e);
      setShowDeleteConfirmation(false);
    },
  });

  const handleEditCancelClick = () => {
    setIsEditingTitle((state) => !state);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = () => {
    updateTitle({ variables: { id: issue?.id, title } });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmationDeleteClick = () => {
    deleteIssue({ variables: { id: issue?.id } });
  };

  React.useEffect(() => {
    setTitle(issue?.title);
  }, [issue]);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" height="60px">
        {isEditingTitle ? (
          <TextInput
            aria-label="Title"
            name="title"
            placeholder="Your issue title"
            value={title}
            variant="large"
            sx={{ fontSize: ['16px', '16px', '16x', '16px'] }}
            onChange={handleTitleChange}
            width="350px"
          />
        ) : (
          <Heading fontSize={5}>{issue?.title}</Heading>
        )}
        <Flex>
          {isEditingTitle && (
            <ButtonPrimary onClick={handleSaveClick} mr={3}>
              Save
            </ButtonPrimary>
          )}
          <Button onClick={handleEditCancelClick} width="90px">
            {isEditingTitle ? 'Cancel' : 'Edit title'}
          </Button>
          <Relative>
            <Popover open={showDeleteConfirmation} caret="top-left" mt={6}>
              <Popover.Content mt={2} width="300px">
                <Heading fontSize={2}>Delete issue</Heading>
                <Text as="p">Do you really want to delete the issue?</Text>
                <Flex>
                  <ButtonPrimary onClick={handleConfirmationDeleteClick}>
                    Yep, delete!
                  </ButtonPrimary>
                  <Button ml={2} onClick={() => setShowDeleteConfirmation(false)}>
                    Cancel
                  </Button>
                </Flex>
              </Popover.Content>
            </Popover>
            <ButtonDanger onClick={handleDeleteClick} ml={2}>
              Delete
            </ButtonDanger>
          </Relative>
        </Flex>
      </Flex>
      {mutationError && <ErrorMessage error={mutationError} />}
      <Flex alignItems="center">
        <Text color="text.grayLight" fontSize="13px">
          Created by <Text fontWeight="bold">{issue?.author?.login}</Text>{' '}
          {formatDistance(new Date(issue?.createdAt), new Date(), { addSuffix: true })}
        </Text>
        <StateLabel
          status={issue?.state === 'OPEN' ? 'issueOpened' : 'issueClosed'}
          variant="small"
          ml={2}
        >
          {issue?.state}
        </StateLabel>
      </Flex>
    </>
  );
}
