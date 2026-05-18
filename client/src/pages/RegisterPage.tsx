import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { registerUser } from "../api/auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await registerUser(
        name,
        email,
        password
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-10 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 mb-6 rounded-xl bg-slate-800 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl text-xl"
        >
          Register
        </button>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;