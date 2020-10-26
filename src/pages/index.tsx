import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'

import {Container, Title} from '../styles/pages/Home'

interface IProduct {
  id: string
  title: string
}

interface HomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({ recommendedProducts }) {
  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data)
  //     })
  //   })
  // }, [])
  
  if(!recommendedProducts) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <Container>
      <section>
        <Title>Products</Title>
        <ul>
          {
            recommendedProducts.map(product => (
              <li key={product.id}>{product.title}</li>
            ))
          }
        </ul>
      </section>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () =>{
  const response = await fetch('http://localhost:3333/recommended')
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
