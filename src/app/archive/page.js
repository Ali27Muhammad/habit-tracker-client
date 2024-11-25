"use client";
import { useState, useEffect } from "react";
export default function Archive() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/habit/archived");
        const data = await response.json();
        setHabits(data || []);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8 sm:p-16">
      <h1 className="text-3xl font-bold mb-4">Archives</h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="bg-card-bg p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h2 className="text-xl font-semibold">{habit.title}</h2>
                <p className="text-sm text-secondary">
                  CreatedAt: {new Date(habit.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
