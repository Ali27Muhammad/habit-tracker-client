"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchInput from "./components/SearchInput";
import SelectInput from "./components/SelectInput/SelectInput";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/habit?page=${page}&limit=2&sortBy=${sortBy}&orderBy=${order}&title=${searchTerm}`
      );
      const data = await response.json();
      setHabits(data.docs || []);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [searchTerm, sortBy, order, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleArchive = async (habitId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/habit/${habitId}/archive`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        fetchHabits();
        toast.success("Habit archived successfully.");
      } else {
        toast.error("Failed to archive habit.");
      }
    } catch (error) {
      console.error("Error archiving habit:", error);
      toast.error("Error archiving habit.");
    }
  };

  const handleMarkComplete = async (habitId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/habit/${habitId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchHabits();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update habit status.");
      }
    } catch (error) {
      console.error("Error updating habit status:", error);
      toast.error("Error updating habit status.");
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 sm:p-16">
      <h1 className="text-3xl font-bold mb-4">Habit Tracker Dashboard</h1>

      <div className="flex justify-between mb-6">
        <div className="flex gap-6">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <SelectInput
            id="sortBy"
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "createdAt", label: "Sort by Date" },
              { value: "streak", label: "Sort by Streak" },
            ]}
          />

          <SelectInput
            id="order"
            label="Order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            options={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
          />
        </div>

        <Link href="/habit/add">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            CREATE NEW HABIT
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="bg-card-bg p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{habit.title}</h2>
                  <p className="text-sm text-secondary">
                    Current Streak: {habit.streak} day
                  </p>
                  <p className="text-sm text-secondary">
                    CreatedAt: {new Date(habit.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-4 items-center">
                  <Link href={`/habit/edit/${habit._id}`} passHref>
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 transition-all"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                      </svg>
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 transition-all"
                    onClick={() => handleArchive(habit._id)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMarkComplete(habit._id)}
                    className="text-green-500 hover:text-green-700 transition-all"
                  >
                    {habit.completedDates.length > 0 ? (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            {page > 1 && (
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all"
              >
                Previous
              </button>
            )}

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  page === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-card-bg text-blue-700 hover:bg-blue-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {page < totalPages && (
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
