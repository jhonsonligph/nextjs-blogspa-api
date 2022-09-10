import { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Head from 'next/head'
import Breadcrumbs from '../../../components/Breadcrumbs'
import moment from 'moment'
import { useForm } from '../../../util/hooks'
import { AuthContext } from '../../../context/auth';
import { useRouter } from 'next/router'


/**

import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth';

  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    isLoggedIn()
  }, [])


 */

export default function NewPost() {
  const { push, pathname } = useRouter()
  const { auth, isLoggedIn, open, register } = useContext(AuthContext)
  const [base64img, setBase64img] = useState('')
  const [newsDetails, setNewsDetails] = useState({})
  const { onChange, onSubmit, values } = useForm(createPost, {
    title: '',
    content: '',
  })

  useEffect(() => {
    setNewsDetails({
      ...values,
      image: base64img
    })
  }, [base64img])

  // ONMOUNT
  useEffect(() => {
    isLoggedIn()
  }, [])

  function createPost(e) {
    console.log(newsDetails)
    setBase64img('')
    setNewsDetails({
      title: '',
      content: '',
    })
  }

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

  if (!Object.keys(values).length > 0) return

  const { title, content } = newsDetails


  return <>
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
            <span>{postCreated(new Date)}</span>
          </div>
          <textarea className="form-texterea-title" name="title" onChange={onChange} placeholder="Title"></textarea>
          <div className="form-eyecatch-preview" style={{ backgroundImage: `url(${base64img})` }}>
            <label className="button button-upload-image" htmlFor="uploadImage">Upload Image
              <input id="uploadImage" type="file" onChange={onImageSelect} accept="image/*" style={{ visibility: 'hidden', pointerEvents: 'none', opacity: 0 }} />
            </label>
          </div>
          <textarea className="form-texterea-body" name="content" onChange={onChange} placeholder="Content"></textarea>
          {/* <span v-if="formError">{{ formError }}</span> */}
        </div>
      </form>
    </div>
  </>
}