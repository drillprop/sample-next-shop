import { GetServerSideProps } from 'next';
import { PrismaClient, Product } from '@prisma/client';
const prisma = new PrismaClient();

type Props = {
  products: Product[];
};

const AdminProductsPage = ({ products }: Props) => {
  return (
    <div>
      <h1>Admin products page</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.name} {product.priceCents}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await prisma.product.findMany();
  return {
    props: {
      products,
    },
  };
};

export default AdminProductsPage;
