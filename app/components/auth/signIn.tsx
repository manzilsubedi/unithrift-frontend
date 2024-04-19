// "use client";
import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";

interface SignInProps {
  setSelected: React.Dispatch<React.SetStateAction<string | number>>;
}

const SignIn: React.FC<SignInProps> = ({ setSelected }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: {
      required: "",
      length: "",
      uppercase: "",
      lowercase: "",
      number: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const newErrors = {
      required: "",
      length: "",
      uppercase: "",
      lowercase: "",
      number: "",
    };

    if (!password.trim()) {
      newErrors.required = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.length = "Password must be at least 8 characters long";
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.uppercase =
          "Password must contain at least one uppercase letter";
      }
      if (!/[a-z]/.test(password)) {
        newErrors.lowercase =
          "Password must contain at least one lowercase letter";
      }
      if (!/\d/.test(password)) {
        newErrors.number = "Password must contain at least one number";
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: newErrors,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validate StudentID
    if (!formData.username.trim()) {
      newErrors.username = "StudentID is required";
      formIsValid = false;
    }

    // If form is valid, proceed with submission
    if (formIsValid) {
      // console.log(formData);
      const api = process.env.NEXT_PUBLIC_AUTH_API + "login";
      // console.log(api);
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);

          //store user data in cookies

          setCookie("accessToken", data.accessToken);
          setCookie("userId", data.userId);
          setCookie("userName", data.userName);
          setCookie("email", data.email);
          // Redirect user or update application state
          router.push("/site");

          console.log("Login successful");
        } else {
          // Handle login failure, display error message
          console.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    setErrors(newErrors);
  };

  const handleSignUpLinkClick = () => {
    setSelected("sign-up");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        isRequired
        label="StudentID"
        placeholder="Enter your StudentID"
        type="text"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username}</p>
      )}
      <Input
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      {Object.values(errors.password).map((error, index) => (
        <p key={index} className="text-red-500 text-sm">
          {error}
        </p>
      ))}
      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onClick={handleSignUpLinkClick}>
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" className="text-white">
          Login
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
