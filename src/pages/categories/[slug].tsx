import { GetServerSideProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

interface IProduct {
  id: string
  title: string
}

interface CategoryProps {
  products: IProduct[]
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter()

  async function dateNow() {
    const moment = (await import('moment')).default
    alert(`Atual: ${moment()}`)
  }

  if(router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map(product => (
          <li>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categories')
  const categories = await response.json()

  const paths = categories.map(category => ({
    params: { slug: category.id }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetServerSideProps<CategoryProps> = async (context) => {
  const { slug } = context.params

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 60
  }
}
