import { gql, useQuery, useMutation } from '@apollo/client'
import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Breadcrumbs from '../../../components/Breadcrumbs'
import moment from 'moment'
import client from '../../../lib/apollo'
import { AuthContext } from '../../../context/auth';
import { useRouter } from 'next/router'
import withAuth from '../../../components/withAuth'

const EditPost = ({ post }) => {
  const { push } = useRouter()
  const { auth, isLoggedIn } = useContext(AuthContext)
  const [base64img, setBase64img] = useState('')
  const [newsDetails, setNewsDetails] = useState(post)

  // TODO: implement useMutation here with Authentication
  // const { onChange, onSubmit, values } = useForm(createPost, dummyData)

  // ON_MOUNT
  useEffect(() => {
    // isLoggedIn()
  }, [])

  // ON_DATA_CHANGE
  useEffect(() => {
    setNewsDetails({
      ...newsDetails,
      image: base64img
    })
  }, [base64img])


  // ONMOUNT
  // useEffect(() => {
  //   console.log(newsDetails)
  // }, [])

  // useEffect(() => {
  //   console.log(newsDetails)
  // })

  function onChange({ target: { name, value } }) {
    setNewsDetails(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log('UPDATED, now redirecting...', newsDetails)
  }

  function onImageSelect(e) {
    e.preventDefault()
    const files = e.target.files
    const file = files[0]

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setBase64img(reader.result)
    }
  }

  function postCreated(date) {
    return moment(date).format("YYYY[.]MM[.]DD");
  }

  if (!Object.keys(newsDetails).length > 0) return

  const { title, content, image, createdAt, comments } = newsDetails

  // TODO: Comments sections
  return (
    <>
      <Head>
        <title>{`Create New Post`}</title>
      </Head>
      <div className="news-article-create form form-create add">
        <Breadcrumbs item={title ? title : 'Enter a new title'} />
        <form onSubmit={onSubmit} className="l-container">
          <div className="form-controls">
            <ul className="form-controls-list">
              <li className="form-controls-item">
                <button type="submit">Save Post</button>
              </li>
              <li className="form-controls-item">
                <button>Cancel</button>
              </li>
            </ul>
          </div>
          <div className="form-fields">
            <div className="form-date">
              <span>{postCreated(createdAt)}</span>
            </div>
            <textarea className="form-texterea-title" name="title" value={title} onChange={onChange} placeholder="Title"></textarea>
            <div className="form-eyecatch-preview" style={{ backgroundImage: `url(${image ? image : process.env.no_image})` }}>
              <label className="button button-upload-image" htmlFor="uploadImage">Upload Image
                <input id="uploadImage" type="file" onChange={onImageSelect} accept="image/*" style={{ visibility: 'hidden', pointerEvents: 'none', opacity: 0 }} />
              </label>
            </div>
            <textarea className="form-texterea-body" name="content" value={content} onChange={onChange} placeholder="Content"></textarea>
          </div>
        </form>
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

export default EditPost