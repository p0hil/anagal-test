import React from 'react';
import {InertiaLink, useForm} from '@inertiajs/inertia-react';
import TextInput from '@/Common/TextInput';
import LoadingButton from "@/Common/LoadingButton";
import Layout from "@/Common/Layout";

const Login = () => {
  const {data, setData, errors, post, processing} = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: true
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('login.attempt'));
  }

  return (
    <section id="form">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li><InertiaLink href={route('products')}>Home</InertiaLink></li>
            <li className="active">Login</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="login-form">
              <h2>Login to your account</h2>
              <form onSubmit={handleSubmit}>
                <TextInput
                  className="mt-10"
                  label="Email"
                  name="email"
                  type="email"
                  errors={errors.email}
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                />
                <TextInput
                  className="mt-6"
                  label="Password"
                  name="password"
                  type="password"
                  errors={errors.password}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                />

                <LoadingButton
                  type="submit"
                  loading={processing}
                  className="btn btn-default"
                >
                  Login
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.layout = page => <Layout title="Login" children={page}/>;
export default Login;
