import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import SecondHeader from './SecondHeader';
import Footer from './Footer';
import data from '../data/product_data';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { doc, setDoc, arrayUnion } from '@firebase/firestore';
import { db } from '../services/firebase';
import { Product } from '../types/types';

const MoreinfoNegative: React.FC = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.href, title: 'MoreInfo Page' });
  }, []);

  const params   = new URLSearchParams(window.location.search);
  const product  = data.find(
    (p: Product) => String(p.id) === params.get('product_id')
  ) ?? null;

  const userId   = params.get('userId') ?? '';
  const version  = params.get('isV');

  const [open, setOpen] = useState({
    material: false,
    backrest: false,
    seat:     false,
    safety:   false,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((s) => ({ ...s, [key]: !s[key] }));

  const logBuyNow = async (payload: string) =>
    setDoc(doc(db, 'users', userId), { 'Clicked Jetzt Kaufen': arrayUnion(payload) }, { merge: true });

  const logFeature = async (feature: string) =>
    setDoc(
      doc(db, 'users', userId),
      { 'Clicked Feature': arrayUnion(`${feature} ${new Date().toISOString()}`) },
      { merge: true }
    );

  if (!product) return <div>Loading…</div>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <SecondHeader
          userId={userId}
          product_id={params.get('product_id') ?? ''}
          version={version ?? undefined}
          onClickJetztKaufen={logBuyNow}
          timeData={{}}
        />
      </div>

      <main id="top" className="mt-20 px-4 flex flex-col items-center text-center pt-10">
        <h1 className="text-primary-blue text-[3rem] font-black my-4 mt-8">Product Details</h1>

        <FeatureBlock
          title="Material: Plastic"
          open={open.material}
          toggle={() => { toggle('material'); logFeature('Material'); }}
        >
          The {product.product_name} is made from standard plastic.
        </FeatureBlock>

        <FeatureBlock
          title="Backrest: No reclining function"
          open={open.backrest}
          toggle={() => { toggle('backrest'); logFeature('Backrest'); }}
        >
          The {product.product_name} does not offer a reclining backrest.
        </FeatureBlock>

        <FeatureBlock
          title="Adjustable Seat Height: Not included"
          open={open.seat}
          toggle={() => { toggle('seat'); logFeature('Adjustable Seat Height'); }}
        >
          The {product.product_name} does not offer adjustable seat height.
        </FeatureBlock>

        <FeatureBlock
          title="Safety Feature: Not included"
          open={open.safety}
          toggle={() => { toggle('safety'); logFeature('Safety Feature'); }}
        >
          The {product.product_name} does not include a safety mechanism (e.g., wheel lock).
        </FeatureBlock>
      </main>

      <Footer />
    </>
  );
};

export default MoreinfoNegative;

interface FeatureProps { title: string; open: boolean; toggle: () => void; children: React.ReactNode; }

const FeatureBlock: React.FC<FeatureProps> = ({ title, open, toggle, children }) => (
  <div className="p-4">
    <h2
      className="text-primary-blue text-[2.5rem] font-semibold flex items-center justify-center gap-2 cursor-pointer"
      onClick={toggle}
    >
      {title} {open ? <AiOutlineUp size={25} /> : <AiOutlineDown size={25} />}
    </h2>
    <p className={`${open ? 'block' : 'hidden'} text-black max-w-2xl mx-auto mt-2 text-[20px]`}>
      {children}
    </p>
  </div>
);
