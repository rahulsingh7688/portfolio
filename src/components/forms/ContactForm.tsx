'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { contactSchema, type ContactFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          body?.message ?? 'Something went wrong. Your message was not sent. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Your message was not sent. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 size={48} className="text-green-500" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Message Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your full name"
          className={inputClass}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="your@email.com"
          className={inputClass}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="What's this about?"
          className={inputClass}
          {...register('subject')}
        />
        {errors.subject && (
          <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          className={inputClass}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {status === 'error' && errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} className="mr-2" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
