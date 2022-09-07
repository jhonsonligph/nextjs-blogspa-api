import { useRouter } from 'next/router'

const EditPost = () => {
  const
    router = useRouter(),
    { query: { id } } = router
  return (
    <div>
      Edit Post {id}
    </div>
  );
}

export default EditPost;