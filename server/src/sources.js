const { DataSource } = require('apollo-datasource');
const kuuid = require('kuuid');

class ArticleSource extends DataSource {
  constructor(database) {
    super();
    this.db = database;
  }

  addArticle(article) {
    const doc = { ...article, id: kuuid.id() };
    return this.db.articles.put(doc, { pin: true });
  }
}

module.exports = ({ ArticleSource });
