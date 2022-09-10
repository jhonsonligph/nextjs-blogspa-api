import Link from 'next/link'

const Breadcrumbs = ({ item }) => {
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs-list l-container">
        <li className="breadcrumbs-item">
          <Link href="/">
            <a>HOME</a>
          </Link>
        </li>
        <li className="breadcrumbs-item">{item}</li>
      </ul>
    </div>
  )
}

export default Breadcrumbs