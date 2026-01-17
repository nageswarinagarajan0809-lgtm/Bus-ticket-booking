import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaMapMarkerAlt, FaCalendar, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
          <FaBus className="mr-3" size={50} />
          Bus Ticket Booking
        </h1>
        <p className="text-xl mb-8">Find and book your perfect bus journey</p>
        <Link
          to="/search"
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-bold text-lg transition"
        >
          Search Buses
        </Link>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FaBus, title: 'Wide Selection', desc: 'Choose from hundreds of buses' },
            { icon: FaMapMarkerAlt, title: 'Easy Search', desc: 'Find routes quickly' },
            { icon: FaCalendar, title: 'Flexible Dates', desc: 'Book for any date' },
            { icon: FaUsers, title: 'Great Prices', desc: 'Best fares guaranteed' },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center">
                <Icon size={40} className="mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Travel?</h2>
        <p className="mb-6">Book your journey now and get special discounts</p>
        <Link
          to="/search"
          className="bg-green-500 hover:bg-green-600 py-3 px-8 rounded-lg font-bold transition inline-block"
        >
          Start Booking
        </Link>
      </div>
    </div>
  );
};

export default Home;
