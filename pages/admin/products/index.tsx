import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import useSWR from 'swr';
import { product } from '../../../models';
import { fetcher } from '../../../utils/fetcher';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import styles from './Products.module.css';

type Props = {
  products: Product[];
};

const AdminProductsPage = ({ products }: Props) => {
  const [session] = useSession();

  const { data, error } = useSWR<Product[]>('/api/admin/products/', fetcher, {
    initialData: products,
    refreshInterval: 3000,
  });

  const [fields, setFields] = useState({
    name: '',
    category: '',
    price: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const fixedValue = name === 'priceCents' ? parseInt(value) : value;
    setFields({
      ...fields,
      [name]: fixedValue,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/products/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(fields),
    });
  };
  return (
    <div>
      <h1>Admin products page</h1>
      <p> you are logged in as {session?.user.email}</p>
      <button onClick={() => signOut()}>Logout</button>
      <ul>
        {data &&
          data.map((product: Product) => {
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
          <input
            placeholder='name'
            onChange={handleChange}
            type='text'
            name='name'
          />
        </label>
        <label>
          Product category
          <input
            placeholder='category'
            onChange={handleChange}
            type='text'
            name='category'
          />
        </label>
        <label>
          Product price
          <input
            placeholder='priceCents'
            onChange={handleChange}
            type='text'
            name='priceCents'
          />
        </label>
        <button type='submit'>Add product</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    const { res } = context;
    res.setHeader('location', '/api/auth/signin');
    res.statusCode = 302;
    res.end();
  }
  const products = await product.findMany();
  return {
    props: {
      products,
    },
  };
};

export default AdminProductsPage;
