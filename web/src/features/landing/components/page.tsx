import Benefits from './benefits';
import Footer from './footer';
import Hero from './hero';
import Navbar from './navbar/navbar';
import Pricing from './pricing';
import Services from './services';
const landing = () => {
  return (
    <div>
      <Navbar />
      <div className="flex-1 grow">
        <Hero />
        <Benefits />
        <Services />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default landing;
