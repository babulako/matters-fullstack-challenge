import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from "@reach/router";
import { List, Button, Spin, Typography, Space } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';


const FETCH_ARTICLES = gql`
  query FetchArticles($pageSize: Int, $after: String) {
    articles(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      articles {
        id
        title
      }
    }
  }
`;

type ArticleType = {
  id: string,
  title: string,
}

const { Paragraph } = Typography;

const ArticleList: React.FC<RouteComponentProps> = () => {
  const { loading, error, data, fetchMore } = useQuery(FETCH_ARTICLES, {
    variables: { pageSize: 3 },
  });

  const navigate = useNavigate();
  const client = useApolloClient();
  const [loadingMore, setLoadingMore] = React.useState(false);
  const postArticle = React.useCallback(() => navigate(`/post`, { replace: true }), []);
  const showDetail = React.useCallback((id) => navigate(`/${id}`, { replace: true }), []);
  const refresh = React.useCallback(() => {
    client.resetStore();
  }, [client]);

  const more = () => {
    setLoadingMore(true);
    fetchMore({ 
      variables: { after: data.articles.cursor },
    }).then(() => setLoadingMore(false));
  };

  if (loading) return <Spin />;
  if (error) return <Paragraph>{JSON.stringify(error, null, 2)}</Paragraph>

  return (
    <>
      <Button onClick={postArticle} icon={<PlusOutlined />} />
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        <List size="large">
          {(data.articles.articles.map((article: ArticleType) => (
            <List.Item key={article.id}>
              <List.Item.Meta title={article.title} />
              <Button type="link" onClick={() => showDetail(article.id)}>
                DETAIL
                <RightOutlined />
              </Button>
            </List.Item>
          )))}
        </List>
      </div>
      {loadingMore && <Spin />}
      <Space>
        <Button hidden={!data.articles.hasMore} onClick={more}>Fetch More</Button>
        <Button onClick={refresh}>Refresh</Button>
        <Typography.Text type="secondary">For demonstrating article pagination, please have more then three articles</Typography.Text>
      </Space>
    </>
  );
}

export default ArticleList;
