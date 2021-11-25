import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { useNavigate } from "@reach/router";
import { Typography, Button, Spin } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FETCH_ARTICLE = gql`
  query FetchArticle($id: String) {
    article(id: $id) {
      id
      title
      content
    }
  }
`;

interface Props extends RouteComponentProps {
  id?: string;
}


const Article: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery(FETCH_ARTICLE, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate()
  const toList = React.useCallback(() => navigate('/', { replace: true }), []);

  if (loading) return <Spin />;
  if (error) return <Paragraph>{JSON.stringify(error, null, 2)}</Paragraph>

  return (
    <>
      <Button onClick={toList} icon={<RollbackOutlined />} />
      <Title style={{ marginTop: 50, marginBottom: 50 }}>{data.article.title}</Title>
      <Paragraph>{data.article.content}</Paragraph>
    </>
  );
}

export default Article;
