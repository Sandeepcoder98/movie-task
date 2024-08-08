import React from 'react';
import { Pagination } from 'react-bootstrap';

const ReactPaginate = ({ currentPage, totalPages, handlePaginate }) => {
    if (!totalPages) return null
    return (
        <Pagination className="custom-pagination">
            <Pagination.Prev onClick={() => handlePaginate(currentPage - 1)} className="pagination-text" disabled={totalPages === 1 || currentPage === 1}>Prev</Pagination.Prev>
            {Array.from({ length: totalPages })?.map((_, index) => {
                return <Pagination.Item onClick={() => handlePaginate(index + 1)} active={index + 1 === currentPage} key={index}>{index + 1}</Pagination.Item>
            })}
            <Pagination.Next onClick={() => handlePaginate(currentPage + 1)} className="pagination-text" disabled={totalPages === 1 || currentPage === totalPages}>Next</Pagination.Next>
        </Pagination>
    )
}
export default ReactPaginate;