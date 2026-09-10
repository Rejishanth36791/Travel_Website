import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Sign In');
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Welcome Back</h2>
        <p className="text-slate-600 text-sm">Sign in to your Travel to Heaven account</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <Button type="submit" variant="primary" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm text-slate-600 pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700">
          Create account
        </Link>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Create Account');
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Join Travel to Heaven</h2>
        <p className="text-slate-600 text-sm">Create your traveler account to plan & discover</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email Address" type="email" placeholder="name@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Input label="Confirm Password" type="password" placeholder="••••••••" />

        <Button type="submit" variant="primary" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-slate-600 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};
