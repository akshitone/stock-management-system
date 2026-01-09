'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/Header';
import { QualityForm } from '@/components/forms/QualityForm';
import { qualityService, type CreateQualityDto } from '@/lib/api/quality.service';

// ============================================================================
// Create Quality Page
// ============================================================================
export default function CreateQualityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateQualityDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await qualityService.create(data);
      router.push('/masters/quality');
    } catch (err: any) {
      setError(err.message || 'Failed to create quality');
      throw err; // Re-throw to let form handle it
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="New Quality" subtitle="Add a new fabric quality specification" />
      
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
          <i className="uil uil-exclamation-triangle" style={{ marginRight: '8px' }} />
          {error}
        </div>
      )}
      
      <QualityForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="Create Quality" />
    </>
  );
}
