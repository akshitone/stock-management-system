'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/Header';
import { qualityService } from '@/lib/api/quality.service';
import type { Quality } from '@sms/shared';

// ============================================================================
// Quality List Page
// ============================================================================
export default function QualityListPage() {
  const [qualities, setQualities] = useState<Quality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQualities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await qualityService.getAll();
      setQualities(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load qualities');
      setQualities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQualities();
  }, [fetchQualities]);

  // Client-side filtering
  const filteredQualities = useMemo(() => {
    if (!searchTerm) return qualities;
    const term = searchTerm.toLowerCase();
    return qualities.filter(
      (q) =>
        q.name.toLowerCase().includes(term) ||
        q.hsnCode?.toLowerCase().includes(term) ||
        q.description?.toLowerCase().includes(term)
    );
  }, [qualities, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quality?')) return;

    try {
      await qualityService.delete(id);
      fetchQualities();
    } catch (err: any) {
      alert(err.message || 'Failed to delete quality');
    }
  };

  return (
    <>
      <PageHeader title="Quality" subtitle="Manage fabric quality specifications">
        <Link
          href="/masters/quality/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--primary-color)',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <i className="uil uil-plus" />
          Add Quality
        </Link>
      </PageHeader>

      {/* Search & Filters */}
      <div
        style={{
          background: 'var(--white-color)',
          borderRadius: '18px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <i
              className="uil uil-search"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--sec-color)',
              }}
            />
            <input
              type="text"
              placeholder="Search qualities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '10px',
                border: '1px solid var(--grayTwo-color)',
                background: 'var(--section-color)',
                color: 'var(--body-color)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
          <button
            onClick={fetchQualities}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid var(--grayTwo-color)',
              background: 'var(--white-color)',
              color: 'var(--body-color)',
              cursor: 'pointer',
            }}
            title="Refresh"
          >
            <i className="uil uil-refresh" />
          </button>
        </div>
      </div>

      {/* Error Message */}
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

      {/* Quality Table */}
      <div
        style={{
          background: 'var(--white-color)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--sec-color)' }}>
            <i className="uil uil-spinner-alt" style={{ marginRight: '8px' }} />
            Loading...
          </div>
        ) : filteredQualities.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--sec-color)' }}>
            {searchTerm
              ? `No qualities matching "${searchTerm}"`
              : 'No qualities found. Click "Add Quality" to create one.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'var(--section-color)' }}>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Reed</TableHeader>
                  <TableHeader>Picks</TableHeader>
                  <TableHeader>Width</TableHeader>
                  <TableHeader>Weaving Rate</TableHeader>
                  <TableHeader>HSN</TableHeader>
                  <TableHeader>GST</TableHeader>
                  <TableHeader align="center">Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredQualities.map((quality) => (
                  <tr key={quality.id || quality._id} style={{ borderTop: '1px solid var(--gray-color)' }}>
                    <TableCell>
                      <strong>{quality.name}</strong>
                      {quality.description && (
                        <span style={{ display: 'block', fontSize: '12px', color: 'var(--sec-color)' }}>
                          {quality.description}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{quality.reed}</TableCell>
                    <TableCell>{quality.picks}</TableCell>
                    <TableCell>{quality.width}"</TableCell>
                    <TableCell>₹{quality.weavingRate?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>{quality.hsnCode}</TableCell>
                    <TableCell>{quality.gstRate}%</TableCell>
                    <TableCell align="center">
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <Link
                          href={`/masters/quality/${quality.id || quality._id}/edit`}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--info-color)',
                            color: 'white',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '12px',
                          }}
                          title="Edit"
                        >
                          <i className="uil uil-edit" />
                        </Link>
                        <button
                          onClick={() => handleDelete(quality.id || quality._id)}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--danger-color)',
                            color: 'white',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                          title="Delete"
                        >
                          <i className="uil uil-trash" />
                        </button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Results count */}
        {!loading && filteredQualities.length > 0 && (
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--gray-color)',
              color: 'var(--sec-color)',
              fontSize: '13px',
            }}
          >
            Showing {filteredQualities.length} of {qualities.length} qualities
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================================
// Table Components
// ============================================================================
function TableHeader({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <th
      style={{
        padding: '14px 16px',
        textAlign: align,
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--body-color)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <td
      style={{
        padding: '14px 16px',
        textAlign: align,
        fontSize: '14px',
        color: 'var(--body-color)',
      }}
    >
      {children}
    </td>
  );
}
