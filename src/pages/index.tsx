import Image from 'next/image';
import { HomeContainer, Product } from '@/styles/pages/home';

import shirt1 from '../assets/shirts/1.png';
import shirt2 from '../assets/shirts/2.png';
import shirt3 from '../assets/shirts/3.png';

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={401} alt="" />

        <footer>
          <strong>T-Shirt Ignite Lab</strong>
          <span>$19,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} width={520} height={401} alt="" />

        <footer>
          <strong>T-Shirt Ignite Aboard</strong>
          <span>$29,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
