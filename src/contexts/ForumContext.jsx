import React, { createContext, useContext } from "react";
import useCategories from "../hooks/useCategories";
import useTopics from "../hooks/useTopics";
import useComments from "../hooks/useComments";

const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
    const { topics, loading: topicsLoading, error: topicsError, createTopic } = useTopics();
    const { comments, loading: commentsLoading, error: commentsError, createComment } = useComments();

    const loading = categoriesLoading || topicsLoading || commentsLoading;
    const error = categoriesError || topicsError || commentsError;

    return (
        <ForumContext.Provider value={{ categories, topics, comments, loading, error, createTopic, createComment}}>
            {children}
        </ForumContext.Provider>
    );
};

export const useForumContext = () => useContext(ForumContext);