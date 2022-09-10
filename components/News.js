import Link from 'next/link'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function News({ posts }) {
  const { auth } = useContext(AuthContext)
  const postCreated = date => {
    return moment(date).format("YYYY[.]MM[.]DD");
  }

  return (
    <>
      <div className="news-archive-container">
        <h2 className="news-archive-title">News</h2>
        <div className="news-archive-add-news">
          {auth && (<Link href="/news/create">
            <a>Create New Post</a>
          </Link>)}
        </div>
      </div>

      <ul className="news-list">
        {posts && posts?.map(({ id, title, createdAt, image }) => {
          const no_image = 'https://dummyimage.com/1280x720/d6d6d6/fff.jpg&text=404'
          const check_image = image != undefined ? image : no_image
          return (
            <li className="news-item" key={id}>
              <article className="news-card">
                <Link href={`/news/${id}`}>
                  <a><div className="news-card-eyecatch" style={{ backgroundImage: `url(${check_image})` }}></div></a>
                </Link>
                <div className="news-card-body">
                  <p className="news-card-date">{postCreated(createdAt)}</p>
                  <h3 className="news-card-title">{title}</h3>
                </div>
              </article>
            </li>)
        })}
      </ul>
    </>
  );
}
