import StonePaper1 from '@/components/Nftecosystem/NftVoting/StonePaper'
import React from 'react'
import { useRouter } from 'next/router';

const Data = () => {
    const router = useRouter();
    const slug = router.query.slug;
  return (
    <StonePaper1 index={slug}/>
  )
}
export default Data