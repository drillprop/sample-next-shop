import { Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { product } from '../../../models';

type Props = {
  product: Product;
};

const SingleAdminProductPage = ({ product }: Props) => {
  return product ? (
    <div>
      <h1>Admin product</h1>
      <h2>{product.name}</h2>
      <p>{product.priceCents}</p>
      <p>{product.category}</p>
    </div>
  ) : (
    <div>no product</div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context?.params?.id);

  const singleProduct = await product.findOne({ where: { id } });
  return {
    props: {
      product: singleProduct,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await product.findMany();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};
export default SingleAdminProductPage;
