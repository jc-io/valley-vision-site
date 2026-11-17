import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  X,
  Star,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  User,
  ArrowUpRight,
  Send
} from 'lucide-react';

const STUDIO_ADDRESS = '3028 Castro Valley Blvd, Castro Valley, CA 94546';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STUDIO_ADDRESS)}`;

const SERVICES = [
  {
    id: 'svc-1',
    name: 'Eye Exam & Vision Consultation',
    category: 'Exam',
    duration: '30 min',
    price: '$149'
  },
  {
    id: 'svc-2',
    name: 'Contact Lens Fitting',
    category: 'Exam',
    duration: '45 min',
    price: '$129'
  }
  /*{
    id: 'svc-3',
    name: 'other service',
    category: 'others',
    duration: '30 min',
    price: '$40'
  },
  */
];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:15 PM', '2:45 PM', '4:30 PM', '5:45 PM'];

const UPCOMING_DATES = [
  { day: 'Fri', date: '13', month: 'Nov', full: 'Fri, Nov 13' },
  { day: 'Sat', date: '14', month: 'Nov', full: 'Sat, Nov 14' },
  { day: 'Mon', date: '16', month: 'Nov', full: 'Mon, Nov 16' },
  { day: 'Tue', date: '17', month: 'Nov', full: 'Tue, Nov 17' },
  { day: 'Wed', date: '18', month: 'Nov', full: 'Wed, Nov 18' },
];

export default function App() {
  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null

  // Booking wizard state
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState(UPCOMING_DATES[1]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Contact form state
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Auth form state
  const [authSubmitted, setAuthSubmitted] = useState(false);

  const openBookingWithService = (service = SERVICES[0]) => {
    setSelectedService(service);
    setBookingConfirmed(false);
    setBookingOpen(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
      setContactOpen(false);
    }, 1800);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthSubmitted(true);
    setTimeout(() => {
      setAuthSubmitted(false);
      setAuthModal(null);
    }, 1400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#151718] font-sans antialiased selection:bg-[#00A3AD]/20 selection:text-[#151718]">
      {/* 1. TOP NAVIGATION BAR (Booksy Deep Charcoal #151718) */}
      <header className="sticky top-0 z-40 bg-[#151718] text-white border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#00A3AD] flex items-center justify-center shadow-inner">
              <span className="text-white font-extrabold text-lg tracking-tight">象</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight leading-none text-white">
                Valley Vision Optometry
              </span>
            </div>
          </div>

          {/* Center: Prominent Address Pill */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2224] hover:bg-[#282C2F] border border-white/10 text-xs lg:text-sm text-gray-200 transition-colors group"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00A3AD] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate font-medium">{STUDIO_ADDRESS}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
          </a>

          {/* Right: Clean Sign In & Sign Up Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                setAuthSubmitted(false);
                setAuthModal('signin');
              }}
              className="px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthSubmitted(false);
                setAuthModal('signup');
              }}
              className="px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#00A3AD] hover:bg-[#008B94] text-white shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Sub-bar for Address */}
        <div className="md:hidden bg-[#1F2224] border-t border-white/5 px-4 py-2 flex justify-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00A3AD] shrink-0" />
            <span>{STUDIO_ADDRESS}</span>
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <main className="flex-1">
        <section className="relative bg-white border-b border-[#E5E7EB] overflow-hidden">
          {/* Subtle decorative Booksy teal radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[#00A3AD]/[0.07] blur-3xl"
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 text-center">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#151718] leading-[1.12] max-w-3xl mx-auto">
              Welcome to{' '} 
              <br></br>
              <span className="text-[#00A3AD]">Valley Vision Optometry</span>
            </h1>

            {/*Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Book online or get in touch to schedule your appointment.
            </p>
            {/* Primary & Secondary CTAs (Preserving & Elevating Screenshot Core Actions) */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={() => openBookingWithService(SERVICES[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#00A3AD] hover:bg-[#008B94] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#00A3AD]/25 hover:shadow-xl hover:shadow-[#00A3AD]/30 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={() => setContactOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-[#F8F9FA] text-[#151718] font-semibold text-base sm:text-lg border border-[#E5E7EB] hover:border-[#151718]/30 shadow-2xs transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 text-[#00A3AD]" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Subtle Quick Info Strip below buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500">
              <div className="inline-flex items-start gap-2 text-left">
                <span className="mt-1.5 w-2 h-2 shrink-0 rounded-full" />
                <div className="flex flex-col leading-relaxed">
                  <span>Tues – Sat · 9:30 AM – 6:30 PM</span>
                  <span>Mon – Sun · Closed</span>
                  <span className="font-medium text-gray-700">By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* CLEAN MINIMAL FOOTER IN BOOKSY CHARCOAL (#151718) */}
      <footer className="bg-[#151718] text-gray-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#00A3AD] flex items-center justify-center text-white font-bold text-xs">
                象
              </div>
              <span className="font-bold text-white text-sm">Valley Vision Optometry</span>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-[#00A3AD] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#00A3AD] shrink-0" />
              <span>{STUDIO_ADDRESS}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            <button
              onClick={() => openBookingWithService(SERVICES[0])}
              className="text-gray-300 hover:text-[#00A3AD] transition-colors cursor-pointer"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="text-gray-300 hover:text-[#00A3AD] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => setAuthModal('signin')}
              className="text-gray-300 hover:text-[#00A3AD] transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModal('signup')}
              className="text-gray-300 hover:text-[#00A3AD] transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </footer>

      {/* ===================================================================== */}
      {/* INTERACTIVE BOOKING MODAL                                             */}
      {/* ===================================================================== */}
      {bookingOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setBookingOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#151718] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Book Appointment</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#00A3AD]" />
                  {STUDIO_ADDRESS}
                </p>
              </div>
              <button
                onClick={() => setBookingOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#00A3AD]/15 text-[#00A3AD] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#151718]">Appointment Confirmed!</h4>
                <p className="text-sm text-gray-600 mt-2">
                  We look forward to seeing you{clientName ? `, ${clientName}` : ''} at{' '}
                  <span className="font-semibold text-[#151718]">{STUDIO_ADDRESS}</span>.
                </p>

                <div className="mt-5 p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service</span>
                    <span className="font-semibold text-[#151718]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-semibold text-[#151718]">
                      {selectedDate.full} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold text-[#00A3AD]">{selectedService.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingOpen(false)}
                  className="mt-6 w-full py-3 rounded-xl bg-[#00A3AD] hover:bg-[#008B94] text-white font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    1. Choose Service
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {SERVICES.map((svc) => {
                      const active = selectedService.id === svc.id;
                      return (
                        <button
                          type="button"
                          key={svc.id}
                          onClick={() => setSelectedService(svc)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'border-[#00A3AD] bg-[#00A3AD]/[0.06] ring-1 ring-[#00A3AD]'
                              : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm text-[#151718]">{svc.name}</div>
                            <div className="text-xs text-gray-500">{svc.duration}</div>
                          </div>
                          <span className="font-bold text-sm text-[#151718]">{svc.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    2. Select Date
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {UPCOMING_DATES.map((d) => {
                      const active = selectedDate.full === d.full;
                      return (
                        <button
                          type="button"
                          key={d.full}
                          onClick={() => setSelectedDate(d)}
                          className={`py-2.5 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-[#00A3AD] border-[#00A3AD] text-white shadow-xs'
                              : 'bg-white border-[#E5E7EB] text-[#151718] hover:border-gray-300'
                          }`}
                        >
                          <div className={`text-[11px] ${active ? 'text-white/90' : 'text-gray-500'}`}>
                            {d.day}
                          </div>
                          <div className="font-bold text-base leading-tight mt-0.5">{d.date}</div>
                          <div className={`text-[10px] ${active ? 'text-white/90' : 'text-gray-400'}`}>
                            {d.month}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Select Time */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    3. Available Times
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-[#151718] border-[#151718] text-white'
                              : 'bg-white border-[#E5E7EB] text-[#151718] hover:border-[#00A3AD]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD] focus:ring-1 focus:ring-[#00A3AD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="(510) 538-2020"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD] focus:ring-1 focus:ring-[#00A3AD]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00A3AD] hover:bg-[#008B94] text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
                >
                  Confirm Booking · {selectedService.price}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* CONTACT & DIRECTIONS MODAL                                            */}
      {/* ===================================================================== */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#151718] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Contact & Location</h3>
                <p className="text-xs text-gray-400">We’re here to help with any questions</p>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Location Card */}
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00A3AD] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Clinic Address
                    </div>
                    <div className="font-semibold text-sm text-[#151718] mt-0.5">
                      {STUDIO_ADDRESS}
                    </div>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A3AD] hover:text-[#008B94] mt-1"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#00A3AD] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#151718]">Clinic Hours</div>
                      <div className="text-gray-500 mt-0.5">Tues–Sat: 9:30 AM – 6:30 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#00A3AD] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#151718]">Direct Phone</div>
                      <a href="tel:+15105382020" className="text-[#00A3AD] font-medium mt-0.5 block">
                        (510) 538-2020
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              {contactSent ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#00A3AD] mx-auto mb-2" />
                  <p className="font-bold text-[#151718]">Message Sent!</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Our Castro Valley front desk will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00A3AD] hover:bg-[#008B94] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SIGN IN / SIGN UP MODAL                                               */}
      {/* ===================================================================== */}
      {authModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setAuthModal(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#151718] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#00A3AD] flex items-center justify-center font-bold text-sm">
                  B
                </div>
                <h3 className="font-bold text-base">
                  {authModal === 'signin' ? 'Sign In to Your Account' : 'Create a Client Account'}
                </h3>
              </div>
              <button
                onClick={() => setAuthModal(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {authSubmitted ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#00A3AD] mx-auto mb-2" />
                  <p className="font-bold text-[#151718]">
                    {authModal === 'signin' ? 'Welcome back!' : 'Account created!'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authModal === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="Jordan Taylor"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#00A3AD]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00A3AD] hover:bg-[#008B94] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    {authModal === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-1">
                    {authModal === 'signin' ? (
                      <>
                        New here?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthModal('signup')}
                          className="text-[#00A3AD] font-semibold hover:underline cursor-pointer"
                        >
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthModal('signin')}
                          className="text-[#00A3AD] font-semibold hover:underline cursor-pointer"
                        >
                          Sign In
                        </button>
                      </>
                    )}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}