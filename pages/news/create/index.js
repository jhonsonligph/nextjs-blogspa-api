import { useQuery, useMutation } from '@apollo/client'

const NewPost = () => {

  const onSubmit = e => {
    e.preventDefault()
    console.log('Posting')
  }

  return (
    <>
      <div className="news-article-create form form-create add">
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
              {/* <span>{{ postCreated(new Date().toString()) }}</span> */}
            </div>
            <textarea className="form-texterea-title" name="title" placeholder="Title"></textarea>
            {/* <div className="form-eyecatch-preview" :style="{backgroundImage:`url(/static/images/${eyecatch})`}"></div> */}
            <textarea className="form-texterea-body" name="body" placeholder="Content"></textarea>
            {/* <span v-if="formError">{{ formError }}</span> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPost;