import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FormEvent } from 'react';
import { product } from '../../../models';
import styles from './Products.module.css';

type Props = {
  products: Product[];
};

const AdminProductsPage = ({ products }: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Admin products page</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className={styles.productItem} key={product.id}>
              {product.name} {product.priceCents}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit} className={styles.newProductForm}>
        <label>
          Product name
          <input placeholder='name' type='text' name='name' />
        </label>
        <label>
          Product category
          <input placeholder='category' type='text' name='category' />
        </label>
        <label>
          Product price
          <input placeholder='price' type='text' name='price' />
        </label>
        <button type='submit'>Add product</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await product.findMany();
  return {
    props: {
      products,
    },
  };
};

export default AdminProductsPage;
