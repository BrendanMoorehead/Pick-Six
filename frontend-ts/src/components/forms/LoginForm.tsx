import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Formik, Form, Field } from 'formik';
import { Link } from '@heroui/link';
import { PasswordInput } from '@/components/PasswordInput';
const validate = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
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
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
              <PasswordInput
                password={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="text-red-700 text-xs">{errors.password}</p>
              )}
              <Link
                href="/forgot-password"
                className="text-xs text-black justify-end font-bold"
              >
                Forgot Password
              </Link>
            </div>

            <Button type="submit" className="bg-green-900 text-white font-bold">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
