import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import { generateMockBlogData, generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';
import { toOptimizedImage } from '../helpers/general';

const IndexPage = () => {
  const newArrivals = generateMockProductData(3, 'shirt');
  const blogData = generateMockBlogData(3);

  const goToShop = () => {
    navigate('/shop');
  };

  // ------------------ Image Gallery & Admin Logic -------------------
  const [images, setImages] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('images');
      return stored ? JSON.parse(stored) : [
        { img: 'https://via.placeholder.com/150', download: 'https://via.placeholder.com/150' }
      ];
    } else {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = React.useState(false);
  const [newImageUrl, setNewImageUrl] = React.useState('');
  const [newDownloadLink, setNewDownloadLink] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('images', JSON.stringify(images));
    }
  }, [images]);

  const handleAdminLogin = () => {
    const pwd = prompt('Enter admin password:');
    if (pwd === 'admin123') {
      setIsAdmin(true);
      alert('Admin access granted');
    } else {
      alert('Wrong password');
    }
  };

  const addImage = () => {
    if (newImageUrl && newDownloadLink) {
      setImages([...images, { img: newImageUrl, download: newDownloadLink }]);
      setNewImageUrl('');
      setNewDownloadLink('');
    } else {
      alert('Please enter both Image URL and Download Link');
    }
  };
  // --------------------------------------------------------------------

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/banner1.png'}
        title={'Essentials for a cold winter'}
        subtitle={'Discover Autumn Winter 2021'}
        ctaText={'shop now'}
        ctaAction={goToShop}
      />

      {/* Message Container */}
      <div className={styles.messageContainer}>
        <p>
          This is a demonstration of the Sydney theme for verse by{' '}
          <span className={styles.gold}>matter design.</span>
        </p>
        <p>
          wear by <span className={styles.gold}>sunspel</span> and{' '}
          <span className={styles.gold}>scotch&soda</span>
        </p>
      </div>

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'New Collection'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'New Arrivals'} link={'/shop'} textLink={'view all'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/highlight.png'}
            altImage={'highlight image'}
            miniImage={'/highlightmin.png'}
            miniImageAlt={'mini highlight image'}
            title={'Luxury Knitwear'}
            description={`This soft lambswool jumper is knitted in Scotland, using yarn from one of the world's oldest spinners based in Fife`}
            textLink={'shop now'}
            link={'/shop'}
          />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero image={toOptimizedImage('/banner2.png')} title={`-50% off \n All Essentials`} />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>WOMAN</Link>
          <Link to={'/shop'}>MAN</Link>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Sydney'}
        quote={
          '“We believe in two things: the pursuit of quality in everything we do, and looking after one another. Everything else should take care of itself.”'
        }
      />

      {/* Blog Grid */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Journal'} subtitle={'Notes on life and style'} />
          <BlogPreviewGrid data={blogData} />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.sustainableContainer}>
        <Hero
          image={toOptimizedImage('/banner3.png')}
          title={'We are Sustainable'}
          subtitle={
            'From caring for our land to supporting our people, discover the steps we’re taking to do more for the world around us.'
          }
          ctaText={'read more'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div>

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name={'Styled by You'}
          subtitle={'Tag @sydney to be featured.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={toOptimizedImage(`/social/socialMedia1.png`)} alt={'social media 1'} />
          <img src={toOptimizedImage(`/social/socialMedia2.png`)} alt={'social media 2'} />
          <img src={toOptimizedImage(`/social/socialMedia3.png`)} alt={'social media 3'} />
          <img src={toOptimizedImage(`/social/socialMedia4.png`)} alt={'social media 4'} />
        </div>
      </div>
      <AttributeGrid />

      {/* ---------------- Custom Image Gallery Section ---------------- */}
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h2>Image Gallery</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((item, index) => (
            <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
              <img src={item.img} alt={`Image ${index}`} width="200" /><br />
              <a href={item.download} download>Download</a>
            </div>
          ))}
        </div>

        <button onClick={handleAdminLogin} style={{ marginTop: '20px' }}>Admin Login</button>

        {isAdmin && (
          <div style={{ marginTop: '20px' }}>
            <h3>Add New Image</h3>
            <input
              type="text"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              style={{ width: '300px', marginBottom: '10px' }}
            /><br />
            <input
              type="text"
              placeholder="Download Link"
              value={newDownloadLink}
              onChange={e => setNewDownloadLink(e.target.value)}
              style={{ width: '300px', marginBottom: '10px' }}
            /><br />
            <button onClick={addImage}>Add Image</button>
          </div>
        )}
      </div>
      {/* -------------------------------------------------------------- */}
    </Layout>
  );
};

export default IndexPage;
