import { Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { product } from '../../../models';

type Props = {
  product: Product;
};

const SingleAdminProductPage = ({ product }: Props) => {
  console.log(product);
  return (
    <div>
      <h1>Admin product</h1>
      <h2>{product.name}</h2>
      <p>{product.priceCents}</p>
      <p>{product.category}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context?.params?.id);

  const singleProduct = await product.findOne({ where: { id } });
  return {
    props: {
      product: singleProduct,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await product.findMany();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};
export default SingleAdminProductPage;
