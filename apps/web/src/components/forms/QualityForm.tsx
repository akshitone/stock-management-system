'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CreateQualityDto } from '@/lib/api/quality.service';

// ============================================================================
// Types
// ============================================================================
interface QualityFormProps {
  initialData?: Partial<CreateQualityDto>;
  onSubmit: (data: CreateQualityDto) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

// ============================================================================
// Quality Form Component
// ============================================================================
export function QualityForm({
  initialData = {},
  onSubmit,
  isLoading = false,
  submitLabel = 'Save Quality',
}: QualityFormProps) {
  const [formData, setFormData] = useState<CreateQualityDto>({
    name: initialData.name || '',
    reed: initialData.reed || 0,
    picks: initialData.picks || 0,
    ends: initialData.ends || 0,
    width: initialData.width || 0,
    totalDenier: initialData.totalDenier || 0,
    standardWeight: initialData.standardWeight || 0,
    shrinkage: initialData.shrinkage || 0,
    weavingRate: initialData.weavingRate || 0,
    warpingRate: initialData.warpingRate || 0,
    pasaraiRate: initialData.pasaraiRate || 0,
    foldingRate: initialData.foldingRate || 0,
    hsnCode: initialData.hsnCode || '',
    gstRate: initialData.gstRate || 0,
    description: initialData.description || '',
    warpDetails: initialData.warpDetails || [],
    weftDetails: initialData.weftDetails || [],
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(255, 86, 83, 0.1)',
            border: '1px solid var(--danger-color)',
            borderRadius: '8px',
            color: 'var(--danger-color)',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {/* Basic Information */}
        <div
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '24px',
          }}
        >
          <h4 style={{ marginBottom: '20px', color: 'var(--body-color)' }}>
            Basic Information
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormField
              label="Quality Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter quality name"
            />

            <FormField
              label="Description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Enter description"
              multiline
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="HSN Code *"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                required
                placeholder="e.g., 5407"
              />

              <FormField
                label="GST Rate (%)"
                name="gstRate"
                type="number"
                value={formData.gstRate}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '24px',
          }}
        >
          <h4 style={{ marginBottom: '20px', color: 'var(--body-color)' }}>
            Technical Specifications
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="Reed"
                name="reed"
                type="number"
                value={formData.reed}
                onChange={handleChange}
              />

              <FormField
                label="Picks"
                name="picks"
                type="number"
                value={formData.picks}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="Ends"
                name="ends"
                type="number"
                value={formData.ends}
                onChange={handleChange}
              />

              <FormField
                label="Width (inches)"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="Total Denier"
                name="totalDenier"
                type="number"
                value={formData.totalDenier}
                onChange={handleChange}
              />

              <FormField
                label="Standard Weight (gm)"
                name="standardWeight"
                type="number"
                value={formData.standardWeight}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <FormField
              label="Shrinkage (%)"
              name="shrinkage"
              type="number"
              value={formData.shrinkage}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </div>

        {/* Rates */}
        <div
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '24px',
          }}
        >
          <h4 style={{ marginBottom: '20px', color: 'var(--body-color)' }}>
            Rates (₹)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="Weaving Rate"
                name="weavingRate"
                type="number"
                value={formData.weavingRate}
                onChange={handleChange}
                step="0.01"
              />

              <FormField
                label="Warping Rate"
                name="warpingRate"
                type="number"
                value={formData.warpingRate}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField
                label="Pasarai Rate"
                name="pasaraiRate"
                type="number"
                value={formData.pasaraiRate}
                onChange={handleChange}
                step="0.01"
              />

              <FormField
                label="Folding Rate"
                name="foldingRate"
                type="number"
                value={formData.foldingRate}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          marginTop: '24px',
        }}
      >
        <Link
          href="/masters/quality"
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: '1px solid var(--grayTwo-color)',
            background: 'transparent',
            color: 'var(--body-color)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            fontWeight: 500,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// Form Field Component
// ============================================================================
interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  step?: string;
  multiline?: boolean;
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  step,
  multiline = false,
}: FormFieldProps) {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid var(--grayTwo-color)',
    background: 'var(--section-color)',
    color: 'var(--body-color)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--body-color)',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={3}
          style={inputStyles}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          step={step}
          style={inputStyles}
        />
      )}
    </div>
  );
}

export default QualityForm;
