import { useRouter } from 'next/router';
import ShowProducts from '@/components/template/Product/ShowProducts';
import Search from '@/components/template/Search';
import Avatar from '@/components/template/Avatar';
import Logo from '@/components/template/Logo';

export default function ProductPage() {
  const router = useRouter();
  const { name } = router.query;

  const productName = typeof name === 'string' ? name : '';

  return (
    <>
      <div className='flex justify-between'>
        <div className='mt-3'>
          <Logo />
        </div>
        <Search />
        <div className='flex mt-5'>
          <Avatar />
        </div>

      </div>
      <ShowProducts productName={productName} />
    </>
  )
}

