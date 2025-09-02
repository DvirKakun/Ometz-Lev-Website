import { useCallback, useEffect, useState } from "react";
import type { Article } from "../types/articles";

export const useArticleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);

  const openModal = useCallback((article: Article) => {
    const id = article.articleKey || `article-${article.title}`;
    window.location.hash = `#article-${id}`;
    setArticleId(id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash.startsWith('#article-')) {
      window.history.back();
    } else {
      setIsOpen(false);
      setArticleId(null);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article-')) {
        const id = hash.replace('#article-', '');
        setArticleId(id);
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setArticleId(null);
      }
    };

    const handlePopState = () => {
      handleHashChange();
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) {
      closeModal();
    }
  }, [closeModal]);

  return {
    isOpen,
    articleId,
    openModal,
    closeModal,
    onOpenChange,
  };
};