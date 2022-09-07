import { gql, useQuery } from '@apollo/client'
import Login from '../components/Login'
import Register from '../components/Register'

const Carousel = () => {
  const { loading, error, data } = useQuery(gql`
    query Posts($limit: Int) {
      posts(pagination: { limit: $limit }) {
        id
        title
        image
        content
      }
    }`, { variables: { limit: 3 } })


  if (loading) return <span>Loading....</span>
  if (error) return <span>Something went wrong</span>

  const { posts } = data

  return (
    <>
      <div className="carousel">
        <h2>Carousel</h2>
        <ul>
          {posts?.map(({ id, title, content, image }) => (
            <li key={id}>
              <h3>{title} — {id}</h3>
              <p>{content}</p>
              {/* <div className="news-card-eyecatch" style={{ backgroundImage: `url('${image}')` }}></div> */}
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </>
  );
}

export default Carousel;