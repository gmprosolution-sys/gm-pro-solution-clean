// src/pages/Home.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import heroImage from "/images/business-man-watch.jpg";
import inspectionImage from "/images/inspection.jpg";
import taxImage from "/images/tax.jpg";
import notaryImage from "/images/notary.jpg";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  vin: "",
  year: "",
  make: "",
  model: "",
  color: "",
  damage: "",
  loss: "",
  message: "",
  file: null,
};

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    try {
      setSending(true);

      // Enviamos JSON a nuestra API (sin CORS)
      const payload = {
        service: selectedService || "",
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        message: formData.message || "",
      };

      if (selectedService === "Auto Damage Appraisal") {
        payload.vin = formData.vin || "";
        payload.year = formData.year || "";
        payload.make = formData.make || "";
        payload.model = formData.model || "";
        payload.color = formData.color || "";
        payload.damage = formData.damage || "";
        payload.loss = formData.loss || "";
      }

      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${resp.status}`);
      }

      alert("✅ Thank you! Your information has been submitted successfully.");
      setSelectedService(null);
      setFormData(emptyForm);
    } catch (err) {
      console.error("SEND ERROR:", err);
      alert("❌ No se pudo enviar. Abre F12 > Console y mira 'SEND ERROR'.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white flex flex-col items-center justify-center p-6 pt-28"
    >
      {/* HEADER */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold">GM Pro Solution</h1>
        <p className="mt-2 text-gray-300">
          Our values — professionalism, integrity, and precision.
        </p>
        <p className="mt-2 text-lg font-semibold text-blue-300">
          Call us today: (407) 509-9595
        </p>
      </div>

      {/* HERO */}
      <img
        src={heroImage}
        alt="Professional"
        className="mx-auto mt-8 rounded-xl shadow-lg w-80 md:w-96"
      />

      {/* SERVICES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        {[
          {
            name: "Auto Damage Appraisal",
            img: inspectionImage,
            desc: "Professional vehicle inspections and appraisals.",
          },
          {
            name: "Tax Services",
            img: taxImage,
            desc: "Efficient and reliable tax filing and advisory.",
          },
          {
            name: "Notary Services",
            img: notaryImage,
            desc: "Certified notary and document authentication.",
          },
        ].map((service) => (
          <motion.div
            key={service.name}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedService(service.name);
              setFormData(emptyForm);
            }}
          >
            <img
              src={service.img}
              alt={service.name}
              className="rounded-lg mb-4 h-40 w-full object-cover"
            />
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CONTACT */}
      <div id="contact" className="mt-16 text-center max-w-xl">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-300">
          Reach out for any of our services. We’re here to help you.
        </p>
        <p className="text-blue-300 font-semibold mt-2">
          Phone: (407) 509-9595<br />
          Email: gmprosolution@gmail.com
        </p>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <motion.div className="bg-white text-gray-800 p-8 rounded-2xl w-11/12 max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {selectedService} Request Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* CLIENT INFO */}
                <div>
                  <h3 className="font-semibold mb-1">📋 Client Information</h3>
                  <input
                    name="name"
                    required
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border p-2 rounded mb-2"
                  />
                  <input
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-2"
                  />
                  <input
                    name="phone"
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>

                {/* ONLY FOR APPRAISAL */}
                {selectedService === "Auto Damage Appraisal" && (
                  <>
                    <input name="vin" onChange={handleChange} placeholder="VIN" className="w-full border p-2 rounded mb-2" />
                    <input name="year" onChange={handleChange} placeholder="Year" className="w-full border p-2 rounded mb-2" />
                    <input name="make" onChange={handleChange} placeholder="Make" className="w-full border p-2 rounded mb-2" />
                    <input name="model" onChange={handleChange} placeholder="Model" className="w-full border p-2 rounded mb-2" />
                    <input name="color" onChange={handleChange} placeholder="Color" className="w-full border p-2 rounded mb-2" />
                    <textarea name="damage" onChange={handleChange} placeholder="Damage Description" className="w-full border p-2 rounded mb-2" />
                    <textarea name="loss" onChange={handleChange} placeholder="Fact of Loss" className="w-full border p-2 rounded mb-2" />
                  </>
                )}

                {/* MESSAGE */}
                <textarea
                  name="message"
                  onChange={handleChange}
                  placeholder="Additional Message"
                  className="w-full border p-2 rounded mb-2"
                  required
                />

                {/* FILE (no se envía en esta versión gratis) */}
                <div>
                  <label className="block font-semibold mb-1">Upload documents or photos:</label>
                  <input type="file" name="file" onChange={handleChange} className="w-full" />
                  <p className="text-xs text-gray-500 mt-1">
                    Nota: para evitar bloqueos del navegador (CORS), el envío gratis va sin adjuntos.
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                    disabled={sending}
                  >
                    Exit
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <p className="mt-8 text-blue-200 italic">Hablamos Español — Contáctenos hoy.</p>

      <footer className="bg-blue-950 text-white text-center py-6 mt-12 w-full">
        <p className="text-sm">© {new Date().getFullYear()} GM Pro Solution. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
