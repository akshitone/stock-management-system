'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/Header';
import { QualityForm } from '@/components/forms/QualityForm';
import { qualityService, type CreateQualityDto } from '@/lib/api/quality.service';
import type { Quality } from '@sms/shared';

// ============================================================================
// Edit Quality Page
// ============================================================================
export default function EditQualityPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [quality, setQuality] = useState<Quality | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuality = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await qualityService.getById(id);
        setQuality(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load quality');
        setQuality(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuality();
  }, [id]);

  const handleSubmit = async (data: CreateQualityDto) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await qualityService.update(id, data);
      router.push('/masters/quality');
    } catch (err: any) {
      setError(err.message || 'Failed to update quality');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Edit Quality" subtitle="Loading..." />
        <div
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--sec-color)',
          }}
        >
          <i className="uil uil-spinner-alt" style={{ marginRight: '8px' }} />
          Loading quality details...
        </div>
      </>
    );
  }

  if (!quality && error) {
    return (
      <>
        <PageHeader title="Edit Quality" subtitle="Error loading quality" />
        <div
          style={{
            background: 'var(--white-color)',
            borderRadius: '18px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ color: 'var(--danger-color)', marginBottom: '20px' }}>
            <i className="uil uil-exclamation-triangle" style={{ marginRight: '8px' }} />
            {error}
          </div>
          <Link
            href="/masters/quality"
            style={{
              padding: '12px 24px',
              background: 'var(--primary-color)',
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Back to Quality List
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Edit Quality" subtitle={`Editing: ${quality?.name || ''}`} />

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

      {quality && (
        <QualityForm
          initialData={quality}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          submitLabel="Update Quality"
        />
      )}
    </>
  );
}
