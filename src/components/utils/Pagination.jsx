import "./Pagination.css"

const Pagination = ({ membersPerPage, totalMembers, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button onClick={() => setCurrentPage(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default Pagination;