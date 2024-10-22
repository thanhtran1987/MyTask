interface IArticle {
  id: number;
  title: string;
  body: string;
}

type ArticleAction = {
  type: string;
  article: IArticle;
};

type DispatchType = (args: ArticleAction) => ArticleAction;
