import Head from 'next/head'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import Slider from '../components/slider/Slider'
import Stores from '../components/stores/Stores'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mall</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <Stores />
      <Categories />
      <Products 
        title="Top Sales" 
      />
      <Products
        title="Men"
      />
      <Products
        title="Women Fashion"
      />
    </>
  )
}
