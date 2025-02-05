import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Formik, Form, Field } from 'formik';
import { Link } from '@heroui/link';
import { PasswordInput } from '@/components/PasswordInput';
const validate = (values: {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}) => {
  const errors: { email?: string; password?: string; username?: string } = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

export default function LoginForm() {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Input
                name="username"
                type="text"
                label="Username"
                labelPlacement="outside"
                placeholder="Enter your username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && (
                <p className="text-red-700 text-xs">{errors.username}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                name="email"
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <PasswordInput
                password={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="text-red-700 text-xs">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                password={values.confirmPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-700 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-green-900 text-white font-bold mt-4"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
