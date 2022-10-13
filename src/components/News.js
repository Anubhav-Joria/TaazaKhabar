import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// THIS.PROPS IS REPLACED BY PROPS
const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // IN CLASS BASE --> async UpdateNews() {
  const UpdateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading: true,}); -->
    setloading(true);

    let data = await fetch(url);
    props.setProgress(60);
    let parsedata = await data.json();
    props.setProgress(90);

    // THIS IS HOW STATE IS SET IN CBC
    // this.setState({
    //   articles: parsedata.articles,
    //   page: this.state.page,
    //   loading: false,
    //   total: parsedata.totalResults,
    // });
    setarticles(parsedata.articles);
    setloading(false);
    // setpage(state.page)
    settotal(parsedata.total);

    props.setProgress(100);
  };

  // async componentDidMount() {
  //   this.UpdateNews();
  // }
  // REPLACING COMPONENT DID MOUNT WITH USEEFFECT

  useEffect(() => {
    document.title = `Taaza Khabar - ${capitalize(props.category)}`;

    UpdateNews();
    /* eslint no-console: "error" */
  }, []);

  const fetchMoreData = async () => {
    // this.setState({page: this.state.page + 1}) --> CBC

    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    
    setpage(p => p + 1);
    let data = await fetch(url);
    let parsedata = await data.json();

    // this.setState({
    //   articles: this.state.articles.concat(parsedata.articles),
    //   total: parsedata.totalResults,
    // });
    settotal(parsedata.totalResults);
    setarticles(articles.concat(parsedata.articles));
        /* eslint no-console: "error" */
  };

  return (
    <>
      <>
        <h1 className="text-center" style={{ marginTop: "80px" }}>
          Taaza Khabar -{capitalize(props.category)} Headlines
        </h1>

        {loading && <Spinner />}
         <InfiniteScroll
          dataLength={ articles.length }
          next={fetchMoreData}
          hasMore={articles.length !== total}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-4">
              { articles.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 39) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 91)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    </>
  );
};

News.defaultProps = {
  pageSize: 6,
  category: "general",
  country: "in",
};
News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
};
export default News;
