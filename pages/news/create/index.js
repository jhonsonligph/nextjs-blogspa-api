// LIBRARIES
import { useState, useEffect, useContext, useRef } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Breadcrumbs from '../../../components/Breadcrumbs'
import moment from 'moment'
// LOCAL FILES
import { useForm } from '../../../util/hooks'
import { AuthContext } from '../../../context/auth';
import { ADD_POST_MUTATION } from '../../../util/graphql'

export default function NewPost() {
  const [isLogin, setIsLogin] = useState(false)
  const { push, pathname } = useRouter()
  const { auth, total, isLoggedIn, open, register } = useContext(AuthContext)
  const [base64img, setBase64img] = useState('')
  const [newsDetails, setNewsDetails] = useState({ title: '', content: '', image: null })
  const titleInputRef = useRef(null)
  const contentInputRef = useRef(null)
  const { onChange, onSubmit, values } = useForm(createPostCallback, newsDetails)
  const [addPost, { loading, error }] = useMutation(ADD_POST_MUTATION, {
    variables: newsDetails, //TODO: Fix variables in ADD_POST_MUTATION
    update: () => { },
    onError: err => err,
    onCompleted: data => {
      console.log('ON_COMPLETED::DATA', data)
    }
  })

  useEffect(() => {
    setNewsDetails({
      ...values,
      image: base64img
    })
  }, [base64img, values])

  // ONMOUNT
  useEffect(() => {
    isLoggedIn()
    !auth ? push('/') : null
  }, [])

  // useEffect(() => {
  //   console.clear()
  //   console.log('NEWS::DETAILS', newsDetails)
  // }, [newsDetails])

  const onImageSelect = e => {
    e.preventDefault()
    const files = e.target.files
    const file = files[0]

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setBase64img(reader.result)
    }
  }

  const postCreated = date => {
    return moment(date).format("YYYY[.]MM[.]DD");
  }

  function cancelPost(e) {
    e.preventDefault()

    if (newsDetails.title === '' && newsDetails.content === '') {
      alert('No changes made')
      push('/')
    } else {
      if (confirm('Discard changes?')) {
        push('/')
      }
    }
    // else {
    //   setNewsDetails(values)
    // }
  }

  function redirectToDetails() {
    // console.log('VARIABLES:', newsDetails)
    push(`/news/${total}`)
  }

  function createPostCallback() {
    // addPost()
    // TODO: validation for title, content and image
    redirectToDetails()
    // console.log(newsDetails)
  }

  if (loading) return <h1>Loading LOL...</h1>

  const { title } = newsDetails


  return (
    <>
      <Head>
        <title>{`Create New Post`}</title>
      </Head>
      <div className="news-article-create form form-create add">
        <Breadcrumbs item={title ? title : 'Create New Post'} />
        <form onSubmit={onSubmit} className="l-container">
          <div className="form-controls">
            <ul className="form-controls-list">
              <li className="form-controls-item">
                <button type="submit">Save Post</button>
              </li>
              <li className="form-controls-item">
                <button onClick={cancelPost}>Cancel</button>
              </li>
            </ul>
          </div>
          <div className="form-fields">
            <div className="form-date">
              <span>{postCreated(new Date)}</span>
            </div>
            <textarea className="form-texterea-title" name="title" onChange={onChange} placeholder="Title" ref={titleInputRef}></textarea>
            <div className="form-eyecatch-preview" style={{ backgroundImage: `url(${base64img})` }}>
              <label className="button button-upload-image" htmlFor="uploadImage">Upload Image
                <input id="uploadImage" type="file" onChange={onImageSelect} accept="image/*" />
              </label>
            </div>
            <textarea className="form-texterea-body" name="content" onChange={onChange} placeholder="Content" ref={contentInputRef}></textarea>
            {/* <span v-if="formError">{{ formError }}</span> */}
          </div>
        </form>
      </div>
    </>
  )
}