import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { useNavigate } from "@reach/router";
import { Input, Button, Spin, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

export const POST_ARTICLE = gql`
  mutation Mutation($post: Post) {
    postArticle(post: $post) {
      id,
      title,
      content,
    }
  }
`;


const Post: React.FC<RouteComponentProps> = () => {
  const navigate = useNavigate()
  const toList = React.useCallback(() => navigate('/', { replace: true }), []);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const updateTitle = React.useCallback((e) => setTitle(e.target.value), []);
  const updateContent = React.useCallback((e) => setContent(e.target.value), []);

  const [postArticle, { loading }] = useMutation(POST_ARTICLE, {
    variables: {
      post: { title, content }
    },
    onError(err) {
      message.error(`Fail to post article: ${err}`);
    },
    onCompleted(data) {
      toList();
    },
    update(cache) {
      cache.modify({
        fields: {
          articles() {
            return {};
          }
        }
      })
    },
  });

  if (loading) return <Spin />;

  return (
    <>
      <Button onClick={toList} icon={<RollbackOutlined />} />
      <Input
        placeholder="Add a title for the article"
        value={title}
        onChange={updateTitle}
        style={{ marginTop: 40, marginBottom: 10 }}
      />
      <Input.TextArea
        placeholder="The article content"
        showCount
        rows={10}
        value={content}
        onChange={updateContent}
        style={{ marginTop: 10, marginBottom: 40, resize: 'none' }}
      />
      <Button onClick={() => postArticle()}>Post</Button>
    </>
  );
}

export default Post;
