import React, { useState } from 'react';
import { CheckCircle, XCircle, UploadCloud, Calendar, ChevronDown } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useToast } from '../hooks/useToast';
import { supabase } from '../lib/supabase';

// Color scheme
const colors = {
  primary: '#8b5cf6', // Purple
  secondary: '#1e293b', // Dark slate
  success: '#10b981', // Emerald
  error: '#ef4444', // Red
  background: '#0a061e', // Dark background
  text: '#ffffff', // White
  muted: '#94a3b8' // Light slate
};

// Form schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number'),
  company: yup.string().required('Company name is required'),
  industry: yup.string().required('Industry is required'),
  startDate: yup.date().required('Start date is required'),
  resume: yup.mixed().required('Resume is required')
});

export default function EnhancedForm() {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload file to Supabase storage
      const file = data.resume[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save form data
      const { error } = await supabase
        .from('submissions')
        .insert([{
          ...data,
          resume_url: filePath,
          start_date: data.startDate
        }]);

      if (error) throw error;

      setShowSuccessModal(true);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6" style={{ backgroundColor: colors.background }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Step 1 of 3</span>
            <span>33% Complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                  errors.fullName ? 'border-red-500' : 'border-purple-900/30'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                  errors.email ? 'border-red-500' : 'border-purple-900/30'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                {...register('company')}
                className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                  errors.company ? 'border-red-500' : 'border-purple-900/30'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                aria-invalid={!!errors.company}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-300">
                Industry
              </label>
              <div className="relative">
                <select
                  id="industry"
                  {...register('industry')}
                  className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                    errors.industry ? 'border-red-500' : 'border-purple-900/30'
                  } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 appearance-none`}
                  aria-invalid={!!errors.industry}
                >
                  <option value="">Select industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.industry.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                Start Date
              </label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                      errors.startDate ? 'border-red-500' : 'border-purple-900/30'
                    } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                    dateFormat="MM/dd/yyyy"
                  />
                )}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-300">
                Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-purple-900/30">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-6 w-6 text-purple-400" />
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="resume"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        type="file"
                        {...register('resume')}
                        className="sr-only"
                        aria-invalid={!!errors.resume}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              {errors.resume && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.resume.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-purple-900/30">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
              <h3 className="mt-4 text-2xl font-bold text-white">Submission Successful!</h3>
              <p className="mt-2 text-gray-400">
                Thank you for your submission. We'll review your application and get back to you shortly.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
