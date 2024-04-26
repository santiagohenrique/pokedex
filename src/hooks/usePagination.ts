import { useState } from 'react';

interface PaginationProps {
    url: string;
    goToNextPage: (nextUrl: string) => void;
    goToPreviousPage: (previousUrl: string) => void;
}

const usePagination = (initialUrl: string): PaginationProps => {
    const [url, setUrl] = useState(initialUrl);

    const goToNextPage = (nextUrl: string) => {
        setUrl(nextUrl);
    };

    const goToPreviousPage = (previousUrl: string) => {
        setUrl(previousUrl);
    };

    return {
        url,
        goToNextPage,
        goToPreviousPage,
    };
};

export default usePagination;