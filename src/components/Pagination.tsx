import React, {useContext} from 'react';
import {Context} from '../context/context';
import {PaginationItem} from '../components/PaginationItem';

export const Pagination: React.FC = () => {
  const {
    filterFields,
    pagination,
    curPage,
    setCurPage
  } = useContext(Context);

  const addPageToUrl = function(url: string, page: number) {
    return url.indexOf('?') !== -1
      ? `${url}&page=${page}`
      : `${url}?page=${page}`;
  }

  const searchString = Object.keys(filterFields)
    .filter(key => filterFields[key].curValue)
    .map(key => `${key}=${filterFields[key].curValue}`)
    .join('&');

  const originUrl = document.location.origin;

  const url = searchString ? `${originUrl}?${searchString}` : `${originUrl}`;

  const firstPage = curPage > 4 ? url : null;

  const lastPage = (curPage + 4) < pagination.pages
    ? addPageToUrl(url, pagination.pages)
    : null;

  const prevPage = curPage > 1
    ? {num: curPage - 1, href: addPageToUrl(url, curPage - 1)}
    : null;

  const nextPage = curPage < pagination.pages
    ? {num: curPage + 1, href: addPageToUrl(url, curPage + 1)}
    : null;

  const getPages = function() {
    let pages = [];
    for (let i = curPage - 3; i <= (curPage + 3); i++) {
      if (i > 0 && i <= pagination.pages) {
        pages.push({
          num: i,
          href: addPageToUrl(url, i)
        });
      }
    }
    return pages;
  }

  const pages = getPages();

  const handleClick = (event: React.MouseEvent<HTMLElement>, page: number, href: string) => {
    event.preventDefault();
    setCurPage(page);
  }

  return (
    <>
    <div className="text-right mb-4">
      Showing {
        1 + (curPage - 1) * 20
      } to {
        pagination.pages > curPage ? 20 + (curPage - 1) * 20 : pagination.count - 20 * (pagination.pages - 1)
      } of {pagination.count} ({pagination.pages} pages)
    </div>
    <nav className="mb-5">
      <ul className="pagination justify-content-center">
        {firstPage && <PaginationItem
          pageNum={1}
          pageText="First"
          pageHref={firstPage}
          handleClick={handleClick}
        />}
        {prevPage && <PaginationItem
          pageNum={prevPage.num}
          pageText="Previous"
          pageHref={prevPage.href}
          handleClick={handleClick}
        />}
        {curPage > 4 && <li className="px-2 pb-2 d-flex align-items-center" key="prevDots">. . .</li>
        }
        {pages.map(page => (
          <PaginationItem
            pageNum={page.num}
            pageHref={page.href}
            handleClick={handleClick}
            active={page.num === +curPage}
            key={page.num}
          />
        ))}
        {(pagination.pages - curPage) >= 4 && <li className="px-2 pb-2 d-flex align-items-center" key="nextDots">. . .</li>
        }
        {nextPage && <PaginationItem
            pageNum={nextPage.num}
            pageText="Next"
            pageHref={nextPage.href}
            handleClick={handleClick}
        />}
        {lastPage && <PaginationItem
            pageNum={pagination.pages}
            pageText="Last"
            pageHref={lastPage}
            handleClick={handleClick}
        />}
      </ul>
    </nav>
    </>
  );
};
