"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
export default function AddHabit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = loading || (!title || !description)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const habitData = { title, description, goal };

    try {
      const response = await fetch("http://localhost:3000/api/habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });

      if (response.ok) {
        console.log("Habit Created Successfully:", habitData);
        router.push("/");
      } else {
        console.error("Failed to create habit");
      }
    } catch (error) {
      console.error("Error occurred while creating habit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-8 p-8 sm:p-16">
      <div className="flex items-center mb-6 gap-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-800 dark:text-white"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-bold">Create New Habit</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mb-6">
          <div className="loader">Loading...</div>{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Habit Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter habit title"
            required
          />
          <TextareaField
            label="Habit Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter habit description"
            rows={4}
          />

          <button
            disabled={isDisabled}
            type="submit"
            className={`py-2.5 px-5 me-2 text-sm font-medium text-white rounded-lg border border-gray-200 
    ${
      loading || isDisabled
        ? "bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-white dark:hover:bg-blue-700"
    }`}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Add Habit"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
