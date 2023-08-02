import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
function NewsTotal(props) {
  // Date object
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currDate = `${currentYear}-${currentMonth}-${currentDay}`;
let uptoDate = `${currentYear-1}-${currentMonth}-${currentDay}`;
  const [articlesNew,setArticlesNew]=useState([]);
  const [totalResultsNew,setTotalResultsNew]=useState(0);
  const [pageNew,setPageNew]=useState(1)
  const [loadingNew,setLoadingNew]=useState(false);
  const firstEverything= async ()=>{
    let mainurl=`https://newsapi.org/v2/everything?q=${props.categorySearch}&from=${currDate}&to=${uptoDate}&sortBy=publishedAt&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    props.setProgress(10);
    let data=await fetch(mainurl);
    props.setProgress(40);
    let parsedData=await data.json();
    props.setProgress(70);
    setArticlesNew(parsedData.articles);
    setTotalResultsNew(parsedData.totalResults);
    setLoadingNew(false);
    props.setProgress(100);
  }
  const mMoreData=async ()=>{
  const url=`https://newsapi.org/v2/everything?q=${props.categorySearch}&from=${currDate}&to=${uptoDate}&sortBy=popularity&apiKey=${props.apiKey}&page=${pageNew+1}&pageSize=${props.pageSize}`;
  let data=await fetch(url);
  let parsedData=await data.json();
  setArticlesNew(articlesNew.concat(parsedData.articles));
  await setPageNew(pageNew+1);
  setTotalResultsNew(parsedData.totalResultsNew);
  };
  useEffect(()=>{
    firstEverything();
    // eslint-disable-next-line
  },[])
  return (
    <>
     <h2 style={{margin:"20px 15px",marginTop:"102px"}} className={`text-${props.mode==="light"?"dark":"white"} text-center`}>News Related to your Search "{props.categorySearch}"</h2>
        {loadingNew && <Spinner/>}
        <InfiniteScroll
          dataLength={articlesNew.length}
          next={mMoreData}
          hasMore={articlesNew.length!==totalResultsNew}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row mb-3">
        {
          articlesNew.map((element)=>{
        return <div className="col-md-3 col-sm-6 col-lg-3" key={element.url}>
          
        <NewsItem source={element.source.name} author={element.author} time={element.publishedAt} title={element.title?element.title:" "} description={element.description?element.description:" "} newsUrl={element.url} imgUrl={element.urlToImage}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
    </>
  )
}
NewsTotal.defaultPops={
  pageSize:12,
  categorySearch:'apple'
}
NewsTotal.propTypes={
  pageSize : PropTypes.number,
  categorySearch:PropTypes.string
} 
export default NewsTotal
