import { useEffect, useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
import client from "../../lib/apollo";
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Breadcrumbs from '../../components/Breadcrumbs'
import { AuthContext } from '../../context/auth';

const SingleNews = ({ post }) => {
  const { auth, isLoggedIn, open, isOpen } = useContext(AuthContext)
  const { id, title, content, image, createdAt, comments } = post

  useEffect(() => {
    isLoggedIn()
    if (!auth && open) {
      isOpen()
    }
  }, [])

  const postCreated = date => {
    return moment(date).format("YYYY[.]MM[.]DD");
  }

  return (
    <>
      <Head>
        <title>{`BLOG SPA | ${title}`}</title>
      </Head>
      <div className="news-article">
        <Breadcrumbs item={title} />
        <div className="news-article-edit l-container">
          {auth && (
            <Link href={{ pathname: `/news/edit/${id}` }}>
              <a>Edit Post</a>
            </Link>
          )}
        </div>
        <div className="news-article-container l-container">
          <div className="news-article-date">
            <span>{postCreated(createdAt)}</span>
          </div>
          <h2 className="news-article-title">{title}</h2>
          <div className="form-eyecatch-preview" style={{ backgroundImage: `url(${image ? image : process.env.no_image})` }}></div>
          <div className="news-article-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params: { id } }) {
  const { data: { post } } = await client.query({
    query: gql`
      query($id: Int){
        post(id: $id) {
        id
          title
      image
      content
      createdAt
      comments {
        id
            content
      createdAt
          }
        }
      }
      `,
    variables: { id: +id },
  });

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Posts($limit: Int) {
        posts(pagination: {limit: $limit }) {
        id
          title
      content
        }
      }
      `,
    variables: { limit: -1 },
  });

  const paths = data.posts.map(post => ({
    params: { id: post.id.toString() }
  }))

  return {
    fallback: false,
    paths
  }
}

export default SingleNews