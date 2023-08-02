import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=>{
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//document.title=`${this.capitalizeFirstLetter(props.category)} - NewsDekho`
  
  const updateNews=async()=>{
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    props.setProgress(10);
    let data=await fetch(url);
    props.setProgress(40);
    let parsedData=await data.json();
    props.setProgress(70);
    //console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
    // eslint-disable-next-line
    document.title=`${capitalizeFirstLetter(props.category)} - NewsDekho`;
    // eslint-disable-next-line
  },[])

const fetchMoreData=async ()=>{
      
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data=await fetch(url);
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    };
    return (
      <>
        <h2 style={{margin:"20px 15px",marginTop:"102px"}} className={`text-${props.mode==="light"?"dark":"white"} text-center`}>NewsDekho - Top Headlines From {capitalizeFirstLetter(props.category)}</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row mb-3">
        {
          articles.map((element)=>{
                //console.log(element);
            
        return <div className="col-md-3 col-sm-6 col-lg-3" key={element.url}>
          
        <NewsItem source={element.source.name} author={element.author} time={element.publishedAt} title={element.title?element.title:" "} description={element.description?element.description:" "} newsUrl={element.url} imgUrl={element.urlToImage}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={((page+1)>Math.ceil(this.state.totalArticles/props.pageSize))} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>*/}
      </>
    )
  
}

News.defaultPops={
  country:'in',
  pageSize:8,
  category:'sports'
}
News.propTypes={
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category:PropTypes.string
} 

export default News
