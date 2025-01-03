import React, { useState } from 'react';
import { Loader2, CheckCircle, XCircle, Calendar, ChevronDown, UploadCloud } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

// Validation schema
const schema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  productDescription: yup.string()
    .required('Description is required')
    .min(50, 'Description must be at least 50 characters'),
  location: yup.string().required('Location is required'),
  targetDate: yup.date()
    .required('Target date is required')
    .min(new Date(), 'Target date must be in the future'),
  industry: yup.string().required('Industry is required'),
  attachment: yup.mixed()
    .test('fileSize', 'File too large', (value) => !value || value[0]?.size <= 10485760) // 10MB
    .test('fileType', 'Unsupported file type', (value) => 
      !value || ['application/pdf', 'image/jpeg', 'image/png'].includes(value[0]?.type)
    )
});

export default function ProductForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    if (!user) {
      showToast('Please sign in to generate leads', 'error');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload file if present
      let fileUrl = null;
      if (data.attachment) {
        const file = data.attachment[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('attachments')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        fileUrl = filePath;
      }

      // Save form data
      const { error } = await supabase
        .from('submissions')
        .insert([{
          ...data,
          user_id: user.id,
          attachment_url: fileUrl,
          target_date: data.targetDate
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
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Product Information</h2>
          
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              {...register('productName')}
              className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                errors.productName ? 'border-red-500' : 'border-purple-900/30'
              } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
              aria-invalid={!!errors.productName}
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <XCircle className="h-4 w-4 mr-1" />
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300">
              Product Description
            </label>
            <textarea
              id="productDescription"
              {...register('productDescription')}
              rows={4}
              className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                errors.productDescription ? 'border-red-500' : 'border-purple-900/30'
              } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
              aria-invalid={!!errors.productDescription}
            />
            {errors.productDescription && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <XCircle className="h-4 w-4 mr-1" />
                {errors.productDescription.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Additional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                id="location"
                type="text"
                {...register('location')}
                className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                  errors.location ? 'border-red-500' : 'border-purple-900/30'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Target Date */}
            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-gray-300">
                Target Date
              </label>
              <Controller
                name="targetDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className={`mt-1 block w-full rounded-lg bg-white/5 border ${
                      errors.targetDate ? 'border-red-500' : 'border-purple-900/30'
                    } text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500`}
                    dateFormat="MM/dd/yyyy"
                  />
                )}
              />
              {errors.targetDate && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.targetDate.message}
                </p>
              )}
            </div>

            {/* Industry */}
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

            {/* Attachment */}
            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-300">
                Attachment (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-purple-900/30">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-6 w-6 text-purple-400" />
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="attachment"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="attachment"
                        type="file"
                        {...register('attachment')}
                        className="sr-only"
                        aria-invalid={!!errors.attachment}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              {errors.attachment && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.attachment.message}
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
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing...
              </>
            ) : (
              'Generate Leads'
            )}
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
                Your product information has been successfully submitted. We'll generate leads and notify you.
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
