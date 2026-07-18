"use client";

import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { signup } from "@/api/auth";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  phone: "Phone number",
  password: "Password",
  city: "City",
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "CUSTOMER",
      province: "Bagmati",
      shopCategory: "Groceries",
    },
  });
  const registerUser = useAuthStore((state) => state.registerUser);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const selectedRole = useWatch({ control, name: "role" });

  function submitForm(data) {
    setLoading(true);

    signup({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: {
        city: data.city,
        province: data.province,
      },
      roles: [data.role],
      ...(data.role === "MERCHANT"
        ? {
            shopName: data.shopName,
            shopCategory: data.shopCategory,
          }
        : {}),
    })
      .then((response) => {
        registerUser({ user: response.data });

        router.replace(HOME_ROUTE);

        toast.success("Register successful!");
      })
      .catch((error) => {
        const data = error?.response?.data;

        // Map backend field errors back to form fields
        if (data?.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([field, messages]) => {
            // address.city errors come as "address" key — map to "city"
            const formField = field === "address" ? "city" : field;
            setError(formField, {
              type: "server",
              message: messages.join(". "),
            });
          });
        } else if (typeof data === "string") {
          toast.error(data);
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error("An error occurred. Check your inputs.");
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center py-10">
        <div className="w-full rounded-lg sm:max-w-md dark:bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 md:space-y-6"
              noValidate
            >
              {/* Role Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  I want to register as a:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                      selectedRole === "CUSTOMER"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <input
                      type="radio"
                      value="CUSTOMER"
                      className="sr-only"
                      {...register("role")}
                    />
                    <span className="font-semibold text-sm">Customer</span>
                    <span className="text-[10px] text-center mt-0.5 text-gray-400">
                      Shop & order items
                    </span>
                  </label>
                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                      selectedRole === "MERCHANT"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <input
                      type="radio"
                      value="MERCHANT"
                      className="sr-only"
                      {...register("role")}
                    />
                    <span className="font-semibold text-sm">Merchant</span>
                    <span className="text-[10px] text-center mt-0.5 text-gray-400">
                      Sell & manage shop
                    </span>
                  </label>
                </div>
              </div>

              {/* Merchant Details */}
              {selectedRole === "MERCHANT" && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Shop Information
                  </h3>
                  <div>
                    <label
                      htmlFor="shopName"
                      className="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
                    >
                      Shop Name
                    </label>
                    <input
                      type="text"
                      id="shopName"
                      placeholder="e.g. ABC Grocery Store"
                      className={`bg-gray-50 border text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${
                        errors.shopName ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("shopName", {
                        required:
                          selectedRole === "MERCHANT"
                            ? "Shop Name is required."
                            : false,
                      })}
                    />
                    {errors.shopName && (
                      <p className="mt-0.5 text-xs text-red-600">
                        {errors.shopName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="shopCategory"
                      className="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
                    >
                      Shop Category
                    </label>
                    <select
                      id="shopCategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("shopCategory")}
                    >
                      <option value="Groceries">Groceries</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Cosmetics">Cosmetics</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Stationery">Stationery</option>
                      <option value="Household Items">Household Items</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                  }`}
                  placeholder="John doe"
                  {...register("name", { required: "Name is required." })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="98xxxxxxxx"
                  className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                  }`}
                  {...register("phone", { required: "Phone is required." })}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  id="city"
                  className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.city
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                  }`}
                  placeholder="Kathmandu"
                  {...register("city", { required: "City is required." })}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city.message}
                  </p>
                )}
                <select
                  id="province"
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("province")}
                >
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Sudur-Paschim">Sudur-Paschim</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                  }`}
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div>
                  <PasswordInput
                    id="password"
                    hasError={!!errors.password}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters.",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Must include uppercase, lowercase, number and special character.
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms", {
                      required: "Please accept the Terms and Conditions.",
                    })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.terms.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="relative w-full text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-85"
                disabled={loading}
              >
                Create an account
                {loading && (
                  <Spinner className="absolute right-3 top-2 w-6! h-6!" />
                )}
              </button>

              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  Please fix the errors highlighted above.
                </div>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href={LOGIN_ROUTE}
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
