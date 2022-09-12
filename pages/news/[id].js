import { useState, useEffect, useContext } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import client from "../../lib/apollo";
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Breadcrumbs from '../../components/Breadcrumbs'
import { AuthContext } from '../../context/auth';
import { ADD_COMMENT_ON_POST_MUTATION } from '../../util/graphql'


const SingleNews = ({ post }) => {
  const { auth, isLoggedIn, open, isOpen } = useContext(AuthContext)
  const { id, title, content, image, createdAt, comments } = post
  const [comment, setComment] = useState('')
  const onChangeComment = ({ target: { name, value } }) => setComment(value)
  const onSubmitComment = e => {
    e.preventDefault()
    addComment()
  }

  const [addComment, { loading, error }] = useMutation(ADD_COMMENT_ON_POST_MUTATION, {
    variables: { postId: +id, content }, //TODO: Fix variables in ADD_POST_MUTATION
    update: () => { },
    onError: err => err,
    onCompleted: data => {
      console.log('ON_COMPLETED::DATA_COMMENT', data)
    }
  })

  useEffect(() => {
    isLoggedIn()
    if (!auth && open) {
      isOpen()
    }
  }, [])

  useEffect(() => {
    console.log('COMMENT', comment)
  }, [comment])

  const postCreated = date => {
    return moment(date).format("YYYY[.]MM[.]DD");
  }

  if (loading) return <h3>Loading...</h3>

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
          <div className="news-article-comments comments">
            <h3 className="comments-title">Comment</h3>
            {comments?.reverse()?.map(({ id, content, createdAt }) => (
              <div key={id} className="comments-detail">
                <p>{content}</p>
                <span>{postCreated(createdAt)}</span>
              </div>
            ))}
            {auth ? (
              <form className="comments-comment" onSubmit={onSubmitComment}>
                <textarea name="comment" placeholder="Write comment" onChange={onChangeComment}></textarea>
                <button type="submit">Submit</button>
              </form>
            ) : <h3 className="comments-form-disabled">You must sign-in to comment.</h3>}
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
      }`,
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
        posts(pagination: { limit: $limit }) {
          id
          title
          content
        }
      }`,
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