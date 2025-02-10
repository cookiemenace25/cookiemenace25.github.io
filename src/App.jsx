import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
  Phone,
  Clock,
  MapPin,
  ArrowUp,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

// Scroll to section with smooth animation
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Navigation with smooth scroll
const Navigation = ({ isOpen, toggle }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "bg-white/95 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="transition-all duration-300 hover:opacity-80">
            <img
              src="https://cookiemenace.s3.us-east-2.amazonaws.com/CookieMenacepng.png"
              alt="Cookie Menace"
              className="h-22 w-auto"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggle}
            className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 text-[#b18563]"
            aria-label="Toggle menu"
          >
            <div
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {["Story", "Gallery", "Menu", "Order"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                className="relative text-lg font-medium text-[#b18563] transition-all duration-300 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#b18563] after:transition-all after:duration-300 after:hover:w-full"
                style={{ color: "#b18563" }}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-lg font-medium px-6 py-2 border-2 border-[#b18563] text-[#b18563] rounded-full transition-all duration-300 hover:bg-[#dac2a4] hover:text-[#b18563] hover:border-[#dac2a4]"
              style={{ color: "#b18563" }}
            >
              Place Your Order
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden pt-20 transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 p-8">
          {["Story", "Gallery", "Menu", "Order"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase());
                toggle();
              }}
              className="text-2xl text-[#b18563] transition-all duration-300 transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                color: "#b18563",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
              toggle();
            }}
            className="text-2xl px-8 py-2 border-2 border-[#b18563] text-[#b18563] rounded-full transition-all duration-300 hover:bg-[#dac2a4] hover:text-[#b18563] hover:border-[#dac2a4] transform hover:scale-105"
            style={{
              animationDelay: `${4 * 100}ms`,
              color: "#b18563",
            }}
          >
            Place Your Order
          </a>
        </nav>
      </div>
    </>
  );
};

// Hook for scroll animations
const useScrollAnimation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
};

// Intersection Observer Hook for fade-in animations
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    }, options);

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [domRef, isVisible];
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Hero = () => (
  <div className="min-h-[100svh] flex items-center justify-center bg-[#faf7f0] relative overflow-hidden px-4 py-20">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[#b18563] pattern-dots pattern-size-2 pattern-opacity-100"></div>
    </div>
    <AnimatedSection className="text-center z-10">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#b18563] mb-4 transition-all duration-300 hover:scale-105">
        Cookie Menace
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-[#dac2a4] mb-8 transition-all duration-300">
        Homemade cookies that spark joy
      </p>
      <a
        href="#order"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("order");
        }}
        className="inline-block bg-[#b18563] text-white !text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#dac2a4] hover:scale-105 transform text-lg hover:!text-white"
      >
        Order Now
      </a>
    </AnimatedSection>
  </div>
);

const Story = () => (
  <section id="story" className="py-16 sm:py-24 bg-white">
    <AnimatedSection className="px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#b18563] text-center mb-12 sm:mb-16 transition-all duration-300 hover:scale-105">
        Our Story
      </h2>
      <div className="px-4">
        <div className="bg-[#faf7f0] p-8 sm:p-12 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Quote Section */}
            <div className="text-center mb-10">
              <span className="text-4xl text-[#b18563]">"</span>
              <p className="text-xl sm:text-2xl text-[#b18563] font-medium italic">
                Baking happiness, one cookie at a time
              </p>
              <span className="text-4xl text-[#b18563]">"</span>
            </div>

            {/* Story Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <h3 className="text-lg sm:text-xl font-semibold text-[#b18563] mb-4">
                  Ourr Beginning
                </h3>
                <p className="text-base sm:text-lg text-[#b18563]/80 leading-relaxed">
                  Cookie Menace started in our home kitchen with a simple
                  mission: to create the most delicious, homemade cookies that
                  bring smiles to people's faces. Each cookie is crafted with
                  love, using only the finest ingredients and time-honored
                  recipes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <h3 className="text-lg sm:text-xl font-semibold text-[#b18563] mb-4">
                  Where We Are Today
                </h3>
                <p className="text-base sm:text-lg text-[#b18563]/80 leading-relaxed">
                  What began as a passion project has grown into a beloved local
                  cookie boutique, serving our community with freshly baked
                  happiness. Our commitment to quality and taste remains
                  unchanged, as we continue to delight customers with every
                  bite.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                {
                  title: "Quality",
                  description: "Only the finest ingredients",
                },
                {
                  title: "Love",
                  description: "Baked with passion & care",
                },
                {
                  title: "Fresh",
                  description: "Made fresh to order",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
                >
                  <h4 className="text-lg font-semibold text-[#b18563] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-[#b18563]/80">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Bottom Quote */}
            <div className="text-center mt-10 pt-8 border-t border-[#b18563]/20">
              <p className="text-lg sm:text-xl text-[#b18563] font-medium">
                Thank you for being part of our sweet journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </section>
);

const Gallery = () => {
  const images = [
    {
      alt: "Chocolate Chip Cookies",
      src: "https://cookiemenace.s3.us-east-2.amazonaws.com/cookie1.jpeg",
    },
    {
      alt: "Double Chocolate Cookies",
      src: "https://cookiemenace.s3.us-east-2.amazonaws.com/cookie2.jpeg",
    },
    {
      alt: "Oatmeal Raisin Cookies",
      src: "https://cookiemenace.s3.us-east-2.amazonaws.com/cookie3.jpeg",
    },
    {
      alt: "Sugar Cookies",
      src: "https://cookiemenace.s3.us-east-2.amazonaws.com/cookie2.jpeg",
    },
  ];

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 640) {
        // 640px is sm breakpoint
        const nextIndex = (currentIndex + 1) % images.length;
        const scrollAmount = scrollRef.current.children[0].offsetWidth;

        if (nextIndex === 0) {
          // Reset scroll position to start when reaching the end
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: scrollAmount * nextIndex,
            behavior: "smooth",
          });
        }

        setCurrentIndex(nextIndex);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#faf7f0]">
      <AnimatedSection className="px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#b18563] text-center mb-8 sm:mb-12 transition-all duration-300 hover:scale-105">
          Gallery
        </h2>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-none w-full snap-center px-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-[#b18563] w-4" : "bg-[#dac2a4]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

const Menuu = () => {
  const menuCategories = [
    {
      title: "Classic Chocochip Cookies",
      items: [
        {
          name: "Single Cookie",
          description: "Our signature chocolate chip cookie",
          price: "₹89",
        },
        {
          name: "Double Delight",
          description: "Pack of 2 chocolate chip cookies",
          price: "₹169",
        },
        {
          name: "Party Pack",
          description: "Pack of 5 chocolate chip cookies",
          price: "₹429",
        },
      ],
    },
    {
      title: "Brookies",
      items: [
        {
          name: "Single Brookie",
          description: "Brownie meets cookie in this delicious treat",
          price: "₹99",
        },
        {
          name: "Double Brookie",
          description: "Pack of 2 brookies",
          price: "₹179",
        },
        {
          name: "Party Pack",
          description: "Pack of 5 brookies",
          price: "₹479",
        },
      ],
    },
    {
      title: "Nutella Cookies",
      items: [
        {
          name: "Single Cookie",
          description: "Cookie loaded with Nutella goodness",
          price: "₹109",
        },
        {
          name: "Double Delight",
          description: "Pack of 2 Nutella cookies",
          price: "₹199",
        },
        {
          name: "Party Pack",
          description: "Pack of 5 Nutella cookies",
          price: "₹529",
        },
      ],
    },
    {
      title: "Specials",
      items: [
        {
          name: "Mini Chocochip Cookie Box",
          description: "Box of bite-sized chocolate chip cookies",
          price: "₹250",
        },
        {
          name: "Extra Chocochips",
          description: "Add more chocolate chips to any cookie",
          price: "₹10",
        },
      ],
    },
  ];

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white">
      <AnimatedSection className="px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#b18563] text-center mb-8 sm:mb-12 transition-all duration-300 hover:scale-105">
          Menu
        </h2>
        <div className="space-y-12">
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#b18563] text-center mb-6 transition-all duration-300">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mx-auto">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-6 bg-[#faf7f0] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg sm:text-xl font-semibold text-[#b18563] transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="text-[#dac2a4] font-medium transition-colors duration-300">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

const Order = () => {
  const now = new Date();
  const hours = now.getHours();
  const deliveryDate = new Date();
  deliveryDate.setDate(now.getDate() + (hours >= 18 ? 2 : 1));

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const tileClassName = ({ date }) => {
    if (date.toDateString() === deliveryDate.toDateString()) {
      return "bg-[#b18563] text-white rounded-full delivery-date";
    }
    return "";
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#faf7f0]">
      <AnimatedSection className="px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#b18563] text-center mb-12 sm:mb-16 transition-all duration-300 hover:scale-105">
          Order Your Fresh Baked Cookies
        </h2>
        <div className="px-4">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Delivery Info Card */}
            <div className="bg-[#faf7f0] p-6 rounded-xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-[#b18563] w-6 h-6" />
                <h3 className="text-xl font-semibold text-[#b18563]">
                  Delivery Information
                </h3>
              </div>
              <p className="text-[#b18563] mb-6 text-lg">
                Next available delivery:{" "}
                <span className="font-bold">{formattedDate}</span> after 6 PM
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#b18563]">
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <Clock className="text-[#dac2a4] flex-shrink-0" />
                  <span>24 hours advance booking required</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <MapPin className="text-[#dac2a4] flex-shrink-0" />
                  <span>Delivery in Bangalore only</span>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Calendar Section */}
              <div className="lg:flex-1 mb-12 lg:mb-0">
                <h3 className="text-xl font-semibold text-[#b18563] mb-6">
                  Delivery Calendar
                </h3>
                <Calendar
                  value={deliveryDate}
                  tileClassName={tileClassName}
                  minDetail="month"
                  maxDetail="month"
                  showNavigation={false}
                  className="border-none shadow-md rounded-xl overflow-hidden"
                  tileDisabled={() => true}
                />
              </div>

              {/* Order Steps */}
              <div className="lg:flex-1">
                <h3 className="text-xl font-semibold text-[#b18563] mb-6">
                  How to Order
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Select Your Cookies",
                      description:
                        "Choose from our delicious menu of freshly baked cookies",
                    },
                    {
                      title: "Place Your Order",
                      description:
                        "DM us on Instagram with your selection and delivery details",
                    },
                    {
                      title: "Confirm Order",
                      description:
                        "Receive order confirmation and payment instructions",
                    },
                    {
                      title: "Enjoy!",
                      description:
                        "Your fresh cookies will be delivered at the scheduled time",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-[#faf7f0] rounded-lg transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#b18563] text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#b18563] mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-[#b18563]/80">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-16 sm:py-20 bg-white">
    <div className="px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#b18563] text-center mb-8 sm:mb-12 transition-all duration-300 hover:scale-105">
        Place Your Order
      </h2>
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-[#faf7f0] p-8 sm:p-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <Instagram className="w-12 h-12 sm:w-16 sm:h-16 text-[#b18563]" />
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#b18563]">
                Follow & Order on Instagram
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                DM us on Instagram to place your order and stay updated with our
                latest creations!
              </p>
            </div>
            <a
              href="https://ig.me/m/cookie_menace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#b18563] text-white px-8 py-4 rounded-full text-lg sm:text-xl font-medium 
                transition-all duration-300 hover:bg-[#dac2a4] hover:scale-105 hover:shadow-lg transform"
            >
              <Instagram className="w-6 h-6" />
              @cookie_menace
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#faf7f0] py-6 sm:py-8">
    <div className="container mx-auto px-4 text-center text-sm sm:text-base text-gray-600">
      <p>© {new Date().getFullYear()} Cookie Menace. All rights reserved.</p>
    </div>
  </footer>
);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-[#b18563]/80 hover:bg-[#b18563] text-white shadow-lg transition-all duration-300 backdrop-blur-sm ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      } z-40`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7f0]">
      <Navigation
        isOpen={isMenuOpen}
        toggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <Hero />
      <Story />
      <Gallery />
      <Menuu />
      <Order />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
