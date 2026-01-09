'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/Header';
import { qualityService } from '@/lib/api/quality.service';
import type { Quality } from '@sms/shared';

// ============================================================================
// Types
// ============================================================================
type SortField = 'name' | 'reed' | 'picks' | 'width' | 'weavingRate' | 'hsnCode' | 'gstRate';
type SortOrder = 'asc' | 'desc';

// ============================================================================
// Quality List Page
// ============================================================================
export default function QualityListPage() {
  const [qualities, setQualities] = useState<Quality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Sorting
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // View modal
  const [viewQuality, setViewQuality] = useState<Quality | null>(null);

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

  // Filter, sort, and paginate
  const processedData = useMemo(() => {
    let filtered = qualities;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.name.toLowerCase().includes(term) ||
          q.hsnCode?.toLowerCase().includes(term) ||
          q.description?.toLowerCase().includes(term)
      );
    }
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return filtered;
  }, [qualities, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quality?')) return;
    try {
      await qualityService.delete(id);
      fetchQualities();
    } catch (err: any) {
      alert(err.message || 'Failed to delete quality');
    }
  };

  const handleView = async (id: string) => {
    try {
      const data = await qualityService.getById(id);
      setViewQuality(data);
    } catch (err: any) {
      alert(err.message || 'Failed to load quality details');
    }
  };

  return (
    <>
      <PageHeader title="Quality" subtitle="Manage fabric quality specifications">
        <Link href="/masters/quality/new" className="geex-btn geex-btn__primary">
          <i className="uil uil-plus" style={{ marginRight: '8px' }} />
          Add Quality
        </Link>
      </PageHeader>

      {/* Error Message */}
      {error && (
        <div style={{ padding: '16px 20px', background: 'rgba(255, 86, 83, 0.1)', border: '1px solid var(--danger-color)', borderRadius: '12px', color: 'var(--danger-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="uil uil-exclamation-triangle" style={{ fontSize: '20px' }} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Card with Title + Table */}
      <div style={{ background: 'var(--white-color)', borderRadius: '18px', overflow: 'hidden' }}>
        {/* Card Header: Title + Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--body-color)' }}>
            All Qualities
          </h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <i className="uil uil-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sec-color)' }} />
              <input
                type="text"
                placeholder="Search by name, HSN code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '280px', padding: '10px 14px 10px 40px', borderRadius: '10px', border: '1px solid var(--grayTwo-color)', background: 'var(--section-color)', color: 'var(--body-color)', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <button onClick={fetchQualities} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--grayTwo-color)', background: 'var(--section-color)', color: 'var(--body-color)', cursor: 'pointer' }} title="Refresh">
              <i className="uil uil-refresh" />
            </button>
          </div>
        </div>
        {/* Table */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sec-color)' }}>
            <i className="uil uil-spinner-alt" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }} />
            Loading qualities...
          </div>
        ) : paginatedData.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sec-color)' }}>
            <i className="uil uil-package" style={{ fontSize: '48px', marginBottom: '12px', display: 'block', opacity: 0.5 }} />
            {searchTerm ? `No qualities matching "${searchTerm}"` : 'No qualities found'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
              <thead>
                <tr style={{ background: 'var(--white-color)' }}>
                  <SortableHeader field="name" label="Name" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="reed" label="Reed" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="picks" label="Picks" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="width" label="Width" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="weavingRate" label="Weaving Rate" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="hsnCode" label="HSN" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <SortableHeader field="gstRate" label="GST" sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--body-color)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((quality) => (
                  <tr key={quality.id} style={{ borderTop: '1px solid var(--gray-color)' }}>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ color: 'var(--body-color)' }}>{quality.name}</strong>
                      {quality.description && (
                        <div style={{ fontSize: '12px', color: 'var(--sec-color)', marginTop: '2px' }}>
                          {quality.description.substring(0, 40)}{quality.description.length > 40 ? '...' : ''}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>{quality.reed}</td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>{quality.picks}</td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>{quality.width}"</td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>₹{quality.weavingRate?.toFixed(2) || '0.00'}</td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>{quality.hsnCode}</td>
                    <td style={{ padding: '16px', color: 'var(--body-color)' }}>{quality.gstRate}%</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                        {/* View - Blue */}
                        <button
                          onClick={() => handleView(quality.id)}
                          style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}
                          title="View Details"
                        >
                          <i className="uil uil-eye" />
                        </button>
                        
                        {/* Edit - Green */}
                        <Link
                          href={`/masters/quality/${quality.id}/edit`}
                          style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}
                          title="Edit"
                        >
                          <i className="uil uil-edit" />
                        </Link>
                        
                        {/* Delete - Red */}
                        <button
                          onClick={() => handleDelete(quality.id)}
                          style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}
                          title="Delete"
                        >
                          <i className="uil uil-trash-alt" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && processedData.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid var(--gray-color)', flexWrap: 'wrap', gap: '12px' }}>
            {/* Left side: Per page dropdown + Info text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--grayTwo-color)', background: 'var(--white-color)', color: 'var(--body-color)', fontSize: '13px', cursor: 'pointer' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span style={{ color: 'var(--sec-color)', fontSize: '13px' }}>
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} entries
              </span>
            </div>
            
            {/* Right side: Pagination controls */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--grayTwo-color)', background: currentPage === 1 ? 'var(--gray-color)' : 'var(--white-color)', color: 'var(--body-color)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>
                <i className="uil uil-angle-double-left" />
              </button>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--grayTwo-color)', background: currentPage === 1 ? 'var(--gray-color)' : 'var(--white-color)', color: 'var(--body-color)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>
                <i className="uil uil-angle-left" />
              </button>
              <span style={{ padding: '8px 16px', background: 'var(--section-color)', borderRadius: '8px', color: 'var(--body-color)', fontSize: '13px', fontWeight: 500 }}>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--grayTwo-color)', background: currentPage === totalPages ? 'var(--gray-color)' : 'var(--white-color)', color: 'var(--body-color)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                <i className="uil uil-angle-right" />
              </button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--grayTwo-color)', background: currentPage === totalPages ? 'var(--gray-color)' : 'var(--white-color)', color: 'var(--body-color)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                <i className="uil uil-angle-double-right" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewQuality && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setViewQuality(null)}>
          <div style={{ background: 'var(--white-color)', borderRadius: '18px', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--body-color)', fontSize: '18px' }}>{viewQuality.name}</h3>
              <button onClick={() => setViewQuality(null)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--gray-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="uil uil-times" />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <DetailItem label="Reed" value={viewQuality.reed} />
                <DetailItem label="Picks" value={viewQuality.picks} />
                <DetailItem label="Ends" value={viewQuality.ends} />
                <DetailItem label="Width" value={`${viewQuality.width}"`} />
                <DetailItem label="Total Denier" value={viewQuality.totalDenier} />
                <DetailItem label="Standard Weight" value={`${viewQuality.standardWeight} gm`} />
                <DetailItem label="Shrinkage" value={`${viewQuality.shrinkage}%`} />
                <DetailItem label="HSN Code" value={viewQuality.hsnCode} />
                <DetailItem label="GST Rate" value={`${viewQuality.gstRate}%`} />
                <DetailItem label="Weaving Rate" value={`₹${viewQuality.weavingRate?.toFixed(2)}`} />
                <DetailItem label="Warping Rate" value={`₹${viewQuality.warpingRate?.toFixed(2)}`} />
                <DetailItem label="Pasarai Rate" value={`₹${viewQuality.pasaraiRate?.toFixed(2)}`} />
                <DetailItem label="Folding Rate" value={`₹${viewQuality.foldingRate?.toFixed(2)}`} />
              </div>
              {viewQuality.description && (
                <div style={{ marginTop: '20px' }}>
                  <DetailItem label="Description" value={viewQuality.description} />
                </div>
              )}
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <Link href={`/masters/quality/${viewQuality.id}/edit`} className="geex-btn geex-btn__primary">
                  <i className="uil uil-edit" style={{ marginRight: '8px' }} />Edit Quality
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .geex-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .geex-btn__primary {
          background: var(--primary-color);
          color: white;
        }
        .geex-btn__primary:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}

// ============================================================================
// Components
// ============================================================================
function SortableHeader({ field, label, sortField, sortOrder, onSort }: { field: SortField; label: string; sortField: SortField; sortOrder: SortOrder; onSort: (field: SortField) => void }) {
  const isActive = sortField === field;
  return (
    <th onClick={() => onSort(field)} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--body-color)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>
      {label}
      {isActive ? (
        sortOrder === 'asc' ? <i className="uil uil-sort-amount-up" style={{ marginLeft: '4px', color: 'var(--primary-color)' }} />
                            : <i className="uil uil-sort-amount-down" style={{ marginLeft: '4px', color: 'var(--primary-color)' }} />
      ) : (
        <i className="uil uil-sort" style={{ marginLeft: '4px', opacity: 0.3 }} />
      )}
    </th>
  );
}

function DetailItem({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: 'var(--sec-color)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '14px', color: 'var(--body-color)', fontWeight: 500 }}>{value ?? '-'}</div>
    </div>
  );
}
