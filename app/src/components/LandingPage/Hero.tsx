import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto text-center max-w-2xl">
        <h1 className="text-lg font-bold  sm:text-5xl tracking-wide [word-spacing:0.2em]">
          Welcome to TrueVoices
        </h1>

        <p className="mt-6 font-bold text-xl  tracking-wide [word-spacing:0.15em]">
          Collect and showcase authentic testimonials from your customers with ease.
        </p>

   
        <p className="mt-4 text-m text-muted-foreground [word-spacing:0.1em]">
          Your customers’ voices are your most powerful marketing tool. With TrueVoices, you can effortlessly collect, manage, and embed testimonials—no coding required.
        </p>


        <p className="mt-2 text-m text-muted-foreground [word-spacing:0.1em]">
          Build trust and credibility through genuine feedback from satisfied customers. Set up your testimonial page in minutes and watch your brand thrive!
        </p>


        <div className="mt-10 flex justify-center space-x-6">
          <button 
            onClick={() => navigate('/register')}
            className="h-10 px-6 font-semibold rounded-md bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition"
          >
            Sign Up
          </button>
          <button type="submit"
          
            className="h-10 px-5 font-semibold rounded-md shadow-md border border-primary text-primary hover:bg-primary/10 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
