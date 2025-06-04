import React from 'react'
import HomeCard from '../home/HomeCard'

const getProductCount = () => {
  if (window.innerWidth >= 992) return 5; // Desktop
  if (window.innerWidth >= 768) return 3; // Tablet/iPad
  return 2; // Mobile
};

const RelatedProducts = ({products}) => {
  const [count, setCount] = React.useState(getProductCount());

  React.useEffect(() => {
    const handleResize = () => setCount(getProductCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-3" style={{ backgroundColor: "#EFE3C2"}}>
        <div className="container px-4 px-lg-5 mt-3">
            <h2 className="fw-bolder mb-4">Related Products</h2>
            <div className="row g-4 justify-content-center"
                style={{
                  display: 'grid',
                  gridTemplateColumns: count === 5 ? 'repeat(5, 1fr)' : count === 3 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  gap: '0.25rem', 
                }}>
                {products
                  .sort(() => Math.random() - 0.5)
                  .slice(0, count)
                  .map(product => (
                    <div key={product.id} className="d-flex" style={{height: '350px'}}>
                      <HomeCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default RelatedProducts