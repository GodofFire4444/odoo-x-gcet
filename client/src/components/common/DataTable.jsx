import React from 'react';

const DataTable = ({ columns, data, emptyMessage = "No data available" }) => {
    return (
        <div style={{
            width: '100%',
            overflowX: 'auto',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)'
        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.9375rem'
            }}>
                <thead>
                    <tr style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                        {columns.map((column, index) => (
                            <th key={index} style={{
                                padding: '1rem 1.5rem',
                                fontWeight: '600',
                                color: 'var(--text-muted)',
                                whiteSpace: 'nowrap'
                            }}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} style={{ padding: '1rem 1.5rem' }}>
                                        {column.render ? column.render(row) : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
