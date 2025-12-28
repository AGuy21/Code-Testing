import { useState, useEffect, useCallback, useRef } from 'react';
import { 
    collection, 
    query, 
    orderBy, 
    limit, 
    startAfter, 
    getDocs, 
    DocumentData, 
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/Configs/FirebaseConfig';
import { postType } from '@/constants/types/postType';

const POSTS_PER_PAGE = 10;

export type SortOption = 'newest' | 'oldest' | 'most-liked';

export const usePaginatedPosts = (sortBy: SortOption = 'newest') => {
    const [posts, setPosts] = useState<postType[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [cursors, setCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([null]); // Index i stores cursor for page i+1
    
    const fetchPosts = useCallback(async (targetPage: number, cursor: QueryDocumentSnapshot<DocumentData> | null) => {
        setLoading(true);
        try {
            const postsRef = collection(db, 'posts');
            let sortField = 'createdAt';
            let sortDir: 'asc' | 'desc' = 'desc';

            if (sortBy === 'oldest') {
                sortDir = 'asc';
            } else if (sortBy === 'most-liked') {
                sortField = 'likes';
                sortDir = 'desc';
            }

            let q;
            if (cursor) {
                q = query(postsRef, orderBy(sortField, sortDir), startAfter(cursor), limit(POSTS_PER_PAGE));
            } else {
                q = query(postsRef, orderBy(sortField, sortDir), limit(POSTS_PER_PAGE));
            }

            const snapshot = await getDocs(q);
            
            const newPosts: postType[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as postType));

            setPosts(newPosts);
            setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
            
            // Store the end cursor of this page for the next page
            const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
            
            setCursors(prev => {
                const newCursors = [...prev];
                newCursors[targetPage] = lastVisible;
                return newCursors;
            });

        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [sortBy]);

    // Initial load
    useEffect(() => {
        setPage(1);
        setCursors([null]);
        fetchPosts(1, null);
    }, [sortBy, fetchPosts]);

    const refresh = () => {
        setRefreshing(true);
        setPage(1);
        setCursors([null]);
        fetchPosts(1, null);
    };

    const nextPage = () => {
        if (!hasMore) return;
        const nextPageNum = page + 1;
        const cursor = cursors[page]; // Cursor for next page is stored at index `page` (since 0 is null for page 1)
        setPage(nextPageNum);
        fetchPosts(nextPageNum, cursor);
    };

    const prevPage = () => {
        if (page <= 1) return;
        const prevPageNum = page - 1;
        const cursor = cursors[prevPageNum - 1]; // Cursor for prev page
        setPage(prevPageNum);
        fetchPosts(prevPageNum, cursor);
    };

    return { 
        posts, 
        loading, 
        refreshing, 
        hasMore,
        page,
        refresh,
        nextPage,
        prevPage
    };
};
