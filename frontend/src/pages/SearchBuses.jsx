import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeService from '../services/routeService';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaCalendar, FaSearch } from 'react-icons/fa';

const SearchBuses = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    journeyDate: '',
  });
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.from || !searchParams.to || !searchParams.journeyDate) {
      toast.error('Please fill all search fields');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await routeService.searchRoutes(searchParams);
      setRoutes(response.routes || []);
      if (response.routes.length === 0) {
        toast.info('No buses found for this route');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (route) => {
    navigate(`/booking/${route._id}`, {
      state: { route, searchParams },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Search Buses</h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">From</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="from"
                    value={searchParams.from}
                    onChange={handleChange}
                    className="flex-1 outline-none"
                    placeholder="Departure City"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">To</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="to"
                    value={searchParams.to}
                    onChange={handleChange}
                    className="flex-1 outline-none"
                    placeholder="Arrival City"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Journey Date</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaCalendar className="text-gray-400 mr-2" />
                  <input
                    type="date"
                    name="journeyDate"
                    value={searchParams.journeyDate}
                    onChange={handleChange}
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
            >
              <FaSearch className="mr-2" />
              {loading ? 'Searching...' : 'Search Buses'}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Searching for buses...</p>
              </div>
            ) : routes.length > 0 ? (
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route._id} className="card">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{route.departureTime}</p>
                        <p className="text-gray-600">{route.from}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-600">{route.duration}</p>
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 my-2"></div>
                        <p className="text-sm text-gray-600">{route.distance} km</p>
                      </div>

                      <div>
                        <p className="text-2xl font-bold text-blue-600">{route.arrivalTime}</p>
                        <p className="text-gray-600">{route.to}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">₹{route.baseFare}</p>
                        <p className="text-sm text-gray-600">{route.bus?.availableSeats} seats</p>
                        <button
                          onClick={() => handleBooking(route)}
                          className="mt-2 w-full btn-primary"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No buses found for this route</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBuses;
