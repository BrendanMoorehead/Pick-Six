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
          <Form>
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
            <PasswordInput
              password={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="text-red-700 text-xs">{errors.password}</p>
            )}
            <Link href="/forgot-password">Forgot password?</Link>
            <Button type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
