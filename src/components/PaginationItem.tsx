import React from 'react';
import {PaginationItemProps} from '../dataStructure';

export const PaginationItem: React.FC<PaginationItemProps> = ({pageNum, pageText = pageNum, pageHref, active = false, handleClick}) => (
  <li
    className={active ? 'page-item active' : 'page-item'}
  >
    {active
      ? <span className="page-link">{pageText}</span>
      : <a
          className="page-link"
          href={pageHref}
          onClick={(event) => handleClick(event, pageNum, pageHref)}
        >
          {pageText}
        </a>
    }
  </li>
);
