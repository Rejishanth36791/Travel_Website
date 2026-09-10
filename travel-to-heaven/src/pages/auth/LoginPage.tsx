import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setPageTitle } from '@/lib/utils';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    setPageTitle('Sign In');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginInput) => {
    setApiError(null);
    try {
      const response = await authService.login(data);
      login(response.token, response.user);
      navigate(redirect, { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setApiError(error.message || 'Unable to sign in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Welcome Back</h2>
        <p className="text-slate-600 text-sm">Sign in to your Travel to Heaven account</p>
      </div>

      {apiError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
          {apiError}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
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
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Create Account');
  }, []);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      loginSchema.extend({
        name: loginSchema.shape.email.pipe(
          // Re-define inline for the register form
        ),
      })
    ).catch(() => undefined) as never, // Fallback — we use the separate registerSchema
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  // Use manual validation since the registerSchema with refine has a different shape
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Manual validation
    const fieldErrors: Record<string, string> = {};
    if (name.length < 2) fieldErrors.name = 'Name must be at least 2 characters';
    if (!email || !/\S+@\S+\.\S+/.test(email)) fieldErrors.email = 'Please enter a valid email address';
    if (password.length < 6) fieldErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) fieldErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(fieldErrors).length > 0) {
      setFormErrors(fieldErrors);
      return;
    }

    setApiError(null);
    setFormErrors({});
    setIsSubmittingForm(true);

    try {
      const response = await authService.register({ name, email, password });
      login(response.token, response.user);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setApiError(error.message || 'Unable to create account. Please try again.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Join Travel to Heaven</h2>
        <p className="text-slate-600 text-sm">Create your traveler account to plan & discover</p>
      </div>

      {apiError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
          {apiError}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          error={formErrors.name}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={formErrors.email}
        />
        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={formErrors.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={formErrors.confirmPassword}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmittingForm}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
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
