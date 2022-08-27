import { useState } from 'react';

import Image from 'next/image';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/images/bg-img.jpg"
        alt="movies"
        className="-z-10 !hidden opacity-60 md:!inline"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute left-4 top-4 object-contain md:left-10 md:top-6">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="cursor-pointer"
          width={118}
          height={32}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-customBlack/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="text-md p-1 font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors.email && (
              <p className="text-md p-1 font-light text-orange-500">
                Your password must cointain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          onClick={() => {
            setLogin(true);
          }}
          className="w-full rounded bg-netflix py-3 font-semibold"
        >
          Sign in
        </button>
        <div className="flex flex-col">
          <div className="flex gap-1 text-darkCream">
            <p>New to Netflix?</p>
            <button
              onClick={() => {
                setLogin(false);
              }}
              type="submit"
              className="text-white hover:underline"
            >
              Sign up now
            </button>
          </div>
          <p className="text-darkCream">
            Sign up or use: test@test.com / test123
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
