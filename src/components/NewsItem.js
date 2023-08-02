import React from 'react'

const NewsItem =(props)=> {
    let {title,description,imgUrl,newsUrl,time,author,source}=props;
    return (
      <div className="my-2">
              <div className="card">
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%',zIndex:'1'}}>
    {source}
  </span>
        <img style={{height:"150px",width:"100%"}} src={imgUrl?imgUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} className="card-img-top" alt="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"/>
        <div className="card-body">
          <h6 className="card-title">{title.length>62?title.slice(0,62)+".....":title}</h6>
          <p className="card-text">{description.length>=100?description.slice(0,100)+"....":description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(time).toGMTString()}</small></p>
          <div className="text-center">
          <a href={newsUrl} rel="noopener noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
      </div>
    )  
}

export default NewsItem
